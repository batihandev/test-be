import { Composer, InlineKeyboard } from "grammy";
import type { Context } from "#root/bot/context.js";
import { logHandle } from "#root/bot/helpers/logging.js";

const composer = new Composer<Context>();

const feature = composer.chatType("private");

feature.command("play", logHandle("command-play"), async (ctx) => {
  const keyboard = new InlineKeyboard().webApp(
    "Play",
    "https://test-vercel-pi-opal.vercel.app/",
  );
  await ctx.reply("Click the button below to open the webapp", {
    reply_markup: keyboard,
  });
});

export { composer as playFeature };
