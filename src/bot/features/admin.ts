import { chatAction } from "@grammyjs/auto-chat-action";
import { Composer } from "grammy";
import type { Context } from "#root/bot/context.js";
import { isAdmin } from "#root/bot/filters/index.js";
import { setCommandsHandler } from "#root/bot/handlers/index.js";
import { logHandle } from "#root/bot/helpers/logging.js";

const composer = new Composer<Context>();

const feature = composer.chatType("private").filter(isAdmin);

feature.command(
  "setcommands",
  logHandle("command-setcommands"),
  chatAction("typing"),
  setCommandsHandler,
);
feature.command("showid", logHandle("command-showid"), async (ctx) => {
  await ctx.reply(
    `Chat ID: ${ctx.chat?.id}\nUser ID: ${ctx.from?.id}\nUser Name: ${ctx.from?.first_name} ${ctx.from?.last_name}`,
  );
});

export { composer as adminFeature };
