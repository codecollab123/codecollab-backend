import { FastifyInstance } from "fastify";
import { MongoClient } from "./mongo.client";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const initializeClients = async (fastify: FastifyInstance) => {
  await MongoClient.init(fastify);
};

export * from "./mongo.client";
