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

    const userSocketMap: Record<string, string> = {};
    const roomMessages: Record<string, any[]> = {}; // Store messages while users are in the room

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

          // Send previous messages when the user opens the chat
          if (roomMessages[room_id]) {
            socket.emit("load_old_messages", roomMessages[room_id]);
          } else {
            roomMessages[room_id] = []; // Initialize if not existing
          }
  

        const clients = getAllConnectedClients(room_id);
        clients.forEach(({ socketId }) => {
          io.to(socketId).emit("user_joined", {
            clients,
            userName,
            socketId: socket.id,
          });
        });
      });
  // Handle incoming chat messages and store them in memory
      socket.on("send_message", ({ room_id, message }) => {
        if (!roomMessages[room_id]) {
          roomMessages[room_id] = [];
        }

        roomMessages[room_id].push(message); // Store messages temporarily

        io.to(room_id).emit("receive_message", message);
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
           // Check if the room is empty, then delete messages
           setTimeout((roomId) => {
            if (io.sockets.adapter.rooms.get(roomId)?.size === 0) {
              delete roomMessages[roomId];
              logger.info(`Room ${roomId} is empty. Messages cleared.`);
            }
          }, 5000); // Delay clearing messages to handle quick re-joins
        logger.info(`User disconnected: ${socket.id}`);
      });
    });

    logger.info("WebSocket server initialized");
  }
}
