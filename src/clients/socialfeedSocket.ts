import { FastifyInstance } from "fastify";
import { Server } from "socket.io";
import { createServer } from "http";
import { logger } from "../common/services/logger.service.js";
export const SocialFeedSocket = {
  async init(fastify: FastifyInstance) {
    const httpServer = createServer(fastify.server);
    const io = new Server(httpServer, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
      },
    });

    // Maintain mapping: userId -> socketId
    const userSocketMap: Record<string, string> = {};

    io.on("connection", (socket) => {
      const userId = socket.handshake.query.userId as string;

      if (userId) {
        userSocketMap[userId] = socket.id;
        logger.info(`[Feed] User connected: ${socket.id}`);
        console.log(`User connected: userId=${userId}, SocketId=${socket.id}`);

        // Emit current online users to all
        io.emit("getonlineUser", Object.keys(userSocketMap));
      }

      // Post event
      socket.on("new_post", (postData) => {
        io.emit("receive_post", postData);
      });

      // Like event
      socket.on("like_post", ({ postId, user }) => {
        io.emit("post_liked", { postId, user });
      });

      // Handle disconnect
      socket.on("disconnect", () => {
        logger.info(`[Feed] User disconnected: ${socket.id}`);

        // Remove user from map
        const disconnectedUserId = Object.keys(userSocketMap).find(
          (key) => userSocketMap[key] === socket.id
        );

        if (disconnectedUserId) {
          delete userSocketMap[disconnectedUserId];

          // Emit updated list
          io.emit("getonlineUser", Object.keys(userSocketMap));
        }
      });
    });

    httpServer.listen(4001, () => {
      logger.info("Social Feed WebSocket running on port 4001");
    });
  },
};
