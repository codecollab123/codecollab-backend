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

    const userSocketMap: Record<string, { userName: string; roomId: string }> = {};

    function getAllConnectedClients(room_id: string) {
      return Array.from(io.sockets.adapter.rooms.get(room_id) || []).map((socketId) => ({
        socketId,
        userName: userSocketMap[socketId]?.userName || "Unknown",
      }));
    }

    io.on("connection", (socket) => {
      logger.info(`User connected: ${socket.id}`);

      socket.on("join", ({ room_id, userName }) => {
        // Check if user already has a socket connected
        const existingSocketId = Object.keys(userSocketMap).find(
          (id) => userSocketMap[id]?.userName === userName
        );
      
        if (existingSocketId) {
          io.to(existingSocketId).emit("forced_disconnect"); // Disconnect old socket
          io.sockets.sockets.get(existingSocketId)?.disconnect();
          delete userSocketMap[existingSocketId];
        }
      
        // Store new socket
        userSocketMap[socket.id] = { userName, roomId: room_id };
        socket.join(room_id);
        io.to(room_id).emit("user_joined", { users: getAllConnectedClients(room_id) });
      });
      

      socket.on("disconnect", () => {
        const { roomId } = userSocketMap[socket.id] || {};
        delete userSocketMap[socket.id];

        if (roomId) {
          io.to(roomId).emit("user_joined", { users: getAllConnectedClients(roomId) });
        }

        logger.info(`User disconnected: ${socket.id}`);
      });
    });

    logger.info("WebSocket server initialized");
  }
}
