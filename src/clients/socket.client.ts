import { FastifyInstance } from "fastify";
import { Server } from "socket.io";
import { logger } from "../common/services/logger.service";

export namespace SocketClient {
  export async function init(fastify: FastifyInstance) {
    const io = new Server(fastify.server, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
      },
    });

    const userSocketMap = {};

    function getAllConnectedClients(room_id: string) {
      return Array.from(io.sockets.adapter.rooms.get(room_id) || []).map(
        (socketId) => {
          return {
            userName: userSocketMap[socketId],
            socketId,
          };
        }
      );
    }

    io.on("connection", (socket) => {
      logger.info(`User connected: ${socket.id}`);

      socket.on("join", ({ room_id, userName }) => {
        userSocketMap[socket.id] = userName;
        socket.join(room_id);

        const clients = getAllConnectedClients(room_id);
        clients.forEach(({ socketId }) => {
          io.to(socketId).emit("user_joined", {
            clients,
            userName,
            socketId: socket.id,
          });
        });
      });

      socket.on("code_sync", ({ socketId, code }) => {
        logger.info(`socketId: ${socketId}, code: ${code}`);
        io.to(socketId).emit("code_change", { newCode: code });
      });

      socket.on("code_change", ({ roomId, newCode }) => {
        socket.in(roomId).emit("code_change", { newCode });
      });

      socket.on("disconnecting", () => {
        const rooms = [...socket.rooms];

        rooms.forEach((roomId) => {
          socket.in(roomId).emit("disconnected", {
            socketId: socket.id,
            userName: userSocketMap[socket.id],
          });
        });
        delete userSocketMap[socket.id];
        socket.leave;
        logger.info(`User disconnected: ${socket.id}`);
      });
    });

    logger.info("WebSocket server initialized");
  }
}
