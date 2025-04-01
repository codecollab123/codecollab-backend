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
    const roomMessages: Record<string, any[]> = {};
    // Track users with audio capabilities
    const audioCapableUsers: Record<string, string[]> = {};
    const roomDrawings: Record<string, any[]> = {}; // Store drawings per room


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

      socket.on("join", ({ room_id, userName, hasAudio }) => {
        userSocketMap[socket.id] = userName;
        socket.join(room_id);

        // Initialize audio capable users for this room if not exists
        if (!audioCapableUsers[room_id]) {
          audioCapableUsers[room_id] = [];
        }

        // If the user has audio, add them to the audio capable users
        if (hasAudio) {
          audioCapableUsers[room_id].push(socket.id);
        }

        // Send previous messages when the user opens the chat
        if (roomMessages[room_id]){
          socket.emit("load_old_messages", roomMessages[room_id],)        } 
          else {
          roomMessages[room_id] = []; // Initialize if not existing
        }

        if (roomDrawings[room_id]){
          socket.emit("load_whiteboard", roomDrawings[room_id],)        } 
          else {
            roomDrawings[room_id] = []; // Initialize if not existing
        }

        const clients = getAllConnectedClients(room_id);

        // Notify everyone about the new user
        clients.forEach(({ socketId }) => {
          io.to(socketId).emit("user_joined", {
            clients,
            userName,
            socketId: socket.id,
            hasAudio: hasAudio,
          });
        });

// Handle whiteboard drawing events
socket.on("draw", ({ room_id, drawData }) => {
  if (!roomDrawings[room_id]) {
    roomDrawings[room_id] = [];
  }
  roomDrawings[room_id].push(drawData); // Store drawing
  socket.to(room_id).emit("draw", drawData); // Send to all except sender
});

// Clear whiteboard
socket.on("clear_whiteboard", (room_id) => {
  if (roomDrawings[room_id]) {
    roomDrawings[room_id] = []; // Clear stored drawings
  }
  io.to(room_id).emit("clear_whiteboard"); // Notify all users
});

// Load whiteboard when user joins
if (!roomDrawings[room_id]) roomDrawings[room_id] = []; 
socket.emit("load_whiteboard", roomDrawings[room_id]);


        // Send the new user the list of audio capable users
        if (audioCapableUsers[room_id].length > 0) {
          socket.emit("audio_capable_users", {
            users: audioCapableUsers[room_id].filter((id) => id !== socket.id),
            room_id,
          });
        }
      });

      // New event to handle audio capability announcement
      socket.on("audio_capabilities", ({ room_id, hasAudio }) => {
        if (!audioCapableUsers[room_id]) {
          audioCapableUsers[room_id] = [];
        }

        // Add or remove user from audio capable list
        if (hasAudio && !audioCapableUsers[room_id].includes(socket.id)) {
          audioCapableUsers[room_id].push(socket.id);
        } else if (!hasAudio) {
          audioCapableUsers[room_id] = audioCapableUsers[room_id].filter(
            (id) => id !== socket.id
          );
        }

        // Broadcast to all other users in the room
        socket.to(room_id).emit("audio_capabilities", {
          socketId: socket.id,
          userName: userSocketMap[socket.id],
          hasAudio,
        });
      });

      // Rest of your existing socket event handlers...
      socket.on("send_message", ({ room_id, message }) => {
        if (!roomMessages[room_id]) {
          roomMessages[room_id] = [];
        }

        roomMessages[room_id].push(message);
        socket.to(room_id).emit("receive_message", message);
      });


      socket.on("code_sync", ({ socketId, code }) => {
        logger.info(`socketId: ${socketId}, code: ${code}`);
        io.to(socketId).emit("code_change", { newCode: code });
      });

      socket.on("code_change", ({ roomId, newCode }) => {
        socket.in(roomId).emit("code_change", { newCode });
      });

      socket.on("audio_start", ({ room_id }) => {
        const userName = userSocketMap[socket.id];
        socket.to(room_id).emit("audio_start", {
          socketId: socket.id,
          userName,
        });
        logger.info(`User ${userName} started audio in room ${room_id}`);
      });

      socket.on("audio_mute", ({ room_id }) => {
        const userName = userSocketMap[socket.id];
        socket.to(room_id).emit("audio_mute", {
          socketId: socket.id,
          userName,
        });
        logger.info(`User ${userName} muted audio in room ${room_id}`);
      });

      socket.on("audio_unmute", ({ room_id }) => {
        const userName = userSocketMap[socket.id];
        socket.to(room_id).emit("audio_unmute", {
          socketId: socket.id,
          userName,
        });
        logger.info(`User ${userName} unmuted audio in room ${room_id}`);
      });

      socket.on("webrtc_offer", ({ room_id, offer, to }) => {
        socket.to(to).emit("webrtc_offer", {
          offer,
          socketId: socket.id,
        });
      });

      socket.on("webrtc_answer", ({ room_id, answer, to }) => {
        socket.to(to).emit("webrtc_answer", {
          answer,
          socketId: socket.id,
        });
      });

      socket.on("ice_candidate", ({ room_id, candidate, to }) => {
        socket.to(to).emit("ice_candidate", {
          candidate,
          socketId: socket.id,
        });
      });

      socket.on("voice_activity", ({ room_id, speaking }) => {
        const userName = userSocketMap[socket.id];
        socket.to(room_id).emit("voice_activity", {
          socketId: socket.id,
          speaking,
          userName,
        });
      });

      socket.on("disconnecting", () => {
        const rooms = [...socket.rooms];

        rooms.forEach((roomId) => {
          socket.to(roomId).emit("disconnected", {
            socketId: socket.id,
            userName: userSocketMap[socket.id],
          });

          // Remove user from audio capable users
          if (audioCapableUsers[roomId]) {
            audioCapableUsers[roomId] = audioCapableUsers[roomId].filter(
              (id) => id !== socket.id
            );
          }

          // Fix the timeout issue
          const currentRoomId = roomId;
          setTimeout(() => {
            if (io.sockets.adapter.rooms.get(currentRoomId)?.size === 0) {
              delete roomMessages[currentRoomId];
              delete audioCapableUsers[currentRoomId];
              logger.info(`Room ${currentRoomId} is empty. Resources cleared.`);
            }
          }, 5000);
        });

        delete userSocketMap[socket.id];
        logger.info(`User disconnected: ${socket.id}`);
      });
    });

    logger.info("WebSocket server initialized");
  }
}
