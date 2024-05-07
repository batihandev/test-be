import { Composer } from "grammy";
import type { Context } from "#root/bot/context.js";
import { logHandle } from "#root/bot/helpers/logging.js";

const composer = new Composer<Context>();

const feature = composer.chatType("private");

const message = "Hello, world!";
const url = "https://example.com";
const link = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(message)}`;

const keyboard = {
  inline_keyboard: [
    [
      {
        text: "Share",
        url: link,
      },
    ],
  ],
};

feature.command("invite", logHandle("command-invite"), (ctx) => {
  return ctx.reply(ctx.t("welcome"), {
    reply_markup: keyboard,
  });
});

export { composer as inviteFeature };
