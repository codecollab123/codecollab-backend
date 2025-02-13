import { FastifyInstance } from "fastify";
import { Server } from "socket.io";  
import { logger } from "../common/services/logger.service";

export namespace SocketClient {
  export async function init(fastify: FastifyInstance) {
    // Create the socket.io server with CORS settings
    const io = new Server(fastify.server, {
      cors: {
        origin: "http://localhost:3000", // Allow frontend requests
        methods: ["GET", "POST"], // Allow these HTTP methods
        credentials: true, // Allow cookies or authentication headers
      },
    });

    const userSocketMap: Record<string, string> = {};

    function getAllConnectedClients(room_id: string) {
      return Array.from(io.sockets.adapter.rooms.get(room_id) || []).map((socketId) => ({
        socketId,
        userName: userSocketMap[socketId],
      }));
    }

    // Handle new WebSocket connections
    io.on("connection", (socket) => {
      logger.info(`A user connected ${socket.id}`);

      socket.on("join", ({ room_id, userName }) => {
        userSocketMap[socket.id] = userName;
        socket.join(room_id);
        const clients = getAllConnectedClients(room_id);
        logger.info(clients);
        io.to(room_id).emit("user_joined", { clients }); // Notify all users in the room
      });

      // Handle message from the client
      socket.on("message", (msg) => {
        logger.info("Message received: ", msg);
        socket.emit("message", "Hello from server!");
      });

      // Handle disconnect event
      socket.on("disconnect", () => {
        logger.info(`User disconnected: ${socket.id}`);
        delete userSocketMap[socket.id];
      });
    });

    logger.info("WebSocket server initialized");
  }
}
