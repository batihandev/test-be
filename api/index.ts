import { VercelRequest, VercelResponse } from "@vercel/node";
import type { Bot } from "#root/bot/index.js";
import { config } from "#root/config.js";
import { createBot } from "#root/bot/index.js";
import { createServer } from "#root/server/index.js"; // Update this path to the actual path of your index.ts file

const bot: Bot = createBot(config.BOT_TOKEN);
const server = await createServer(bot);
export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    await bot.api.setWebhook(config.BOT_WEBHOOK, {
      allowed_updates: config.BOT_ALLOWED_UPDATES,
    });
    await server.ready();

    server.server.emit("request", request, response);
  } catch {
    response.status(500).send({ error: "Oops! Something went wrong." });
  }
};
