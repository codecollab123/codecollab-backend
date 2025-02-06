import { FastifyInstance } from "fastify";
import { Server } from "socket.io";  // Correct named import for socket.io
import { logger } from "../common/services/logger.service";

export namespace SocketClient {
  export async function init(fastify: FastifyInstance) {
    // Create the socket.io server
    const io = new Server(fastify.server);  // Use `new socketIO.Server(...)

    const userSocketMap = {};
    function getAllConnectedClients(room_id: string) {
      return Array.from(io.sockets.adapter.rooms.get(room_id) || []).map((socketId) => {
        return {
          socketId,
          userName: userSocketMap[socketId],
        };
      });
    };

    // Handle new WebSocket connections
    io.on("connection", (socket) => {
      logger.info(`A user connected ${socket.id}`);

      socket.on('join', ({ room_id, userName }) => {
        userSocketMap[socket.id] = userName;
        socket.join(room_id);
        const clients = getAllConnectedClients(room_id);
        logger.info(clients);
      })

      // Handle message from the client
      socket.on("message", (msg) => {
        logger.info("Message received: ", msg);
        socket.emit("message", "Hello from server!");
      });

      // Handle disconnect event
      socket.on("disconnect", () => {
        logger.info("User disconnected");
      });
    });

    logger.info("WebSocket server initialized");
  }
}
