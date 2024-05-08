import { VercelRequest, VercelResponse } from "@vercel/node";
import type { Bot } from "#root/bot/index.js";
import { config } from "#root/config.js";
import { createBot } from "#root/bot/index.js";
import { createServer } from "#root/server/index.js"; // Update this path to the actual path of your index.ts file

export default async (request: VercelRequest, response: VercelResponse) => {
  const bot: Bot = createBot(config.BOT_TOKEN);
  const server = await createServer(bot);

  try {
    await server.ready();
    server.server.emit("listening");
  } catch {
    response.status(500).send({ error: "Oops! Something went wrong." });
  }
};
