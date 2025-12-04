import { FastifyInstance } from "fastify";
import { firebaseClient } from "../common/services/firebase.service.js";
import { MongoClient } from "./mongo.client.js";
import { SocketClient } from "./socket.client.js";
import { SocialFeedSocket } from "./socialfeedSocket.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const initializeClients = async (fastify: FastifyInstance) => {
  await MongoClient.init(fastify);
  await firebaseClient.init();
   await SocialFeedSocket.init(fastify);  
  await SocketClient.init(fastify);  // Initialize WebSocket connection
};

export * from "./mongo.client.js";
