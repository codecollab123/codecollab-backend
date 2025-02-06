import { FastifyInstance } from "fastify";
import { Server } from "socket.io";  // Correct named import for socket.io
import { logger } from "../common/services/logger.service";

export namespace SocketClient {
  export async function init(fastify: FastifyInstance) {
    // Create the socket.io server
    const io = new Server(fastify.server);  // Use `new socketIO.Server(...)

    // Handle new WebSocket connections
    io.on("connection", (socket) => {
      logger.info("A user connected");

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
