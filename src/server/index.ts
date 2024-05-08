import http from "node:http";
import fastify, { FastifyRequest, FastifyReply } from "fastify";
import { webhookCallback } from "grammy";
import type { Bot } from "#root/bot/index.js";
import { logger } from "#root/logger.js";

export const createServer = (bot: Bot) => {
  const server = fastify({
    logger,
    serverFactory: (handler, _options) => {
      const server2 = http.createServer((request, response) => {
        (request as unknown as FastifyRequest).raw = request;
        (response as unknown as FastifyReply).raw = response;
        handler(request, response);
      });
      return server2;
    },
  });

  server.setErrorHandler(async (error, request, response) => {
    logger.error(error);
    await response.status(500).send({ error: "Oops! Something went wrong." });
  });

  server.get("/", () => ({ status: true }));
  server.post(`/${bot.token}`, webhookCallback(bot, "fastify"));

  return server;
};

export type Server = ReturnType<typeof createServer>;
