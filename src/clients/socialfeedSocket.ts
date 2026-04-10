import { FastifyInstance } from "fastify";
import { Server } from "socket.io";
import { logger } from "../common/services/logger.service.js";
export const SocialFeedSocket = {
  async init(fastify: FastifyInstance) {
    const io = new Server(fastify.server, {
      path: "/feed-socket", // Listen on a distinct path to avoid collision with main socket
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
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

    logger.info("Social Feed WebSocket attached to Fastify server on /feed-socket");
  },
};
