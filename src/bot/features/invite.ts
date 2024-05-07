import { Composer } from "grammy";
import type { Context } from "#root/bot/context.js";
import { logHandle } from "#root/bot/helpers/logging.js";

const composer = new Composer<Context>();

const feature = composer.chatType("private");

feature.command("invite", logHandle("command-invite"), (ctx) => {
  return ctx.reply("inviteee");
});

export { composer as inviteFeature };
