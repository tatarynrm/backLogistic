dotenv.config();
import mongoose from "mongoose";
import dotenv from "dotenv";

import { Telegraf } from "telegraf";
const bot = new Telegraf(process.env.BOT_TOKEN);

import Notes from "./models/Notes.js";

const start = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log(error);
  }
};
start();

bot.command("start", async (ctx) => {
  ctx.replyWithHTML("Оберіть тип заявки", {
    reply_markup: {
      keyboard: [
        [{ text: `Заявки в процесі` }, { text: `Заявки оплачені` }],
        [{ text: `Заявки не оплачені` }, { text: `Дохід` }],
      ],
      resize_keyboard: true,
    },
  });
});

bot.hears("Заявки в процесі", async (ctx) => {
  const newNote = await Notes.find({ status: "active" });

  await ctx.replyWithHTML(`Заявок: ${newNote.length}`);
  for (let i = 0; i < newNote.length; i++) {
    const element = newNote[i];

    ctx.replyWithHTML(
      `${
        element.date
      }:  ${element.cityFrom.toUpperCase()}-${element.cityTo.toUpperCase()} - ${
        element.price
      }-${element.driver.toUpperCase()} - ${element.carOwner.toUpperCase()}-${
        element.cargoOwner
      }\n${element.note ? element.note : "Нотаток немає"}`
    );
  }
});
bot.hears("Заявки оплачені", async (ctx) => {
  const newNote = await Notes.find({ status: "done" });
  await ctx.replyWithHTML(`Заявок: ${newNote.length}`);
  console.log(newNote);
  for (let i = 0; i < newNote.length; i++) {
    const element = newNote[i];

    ctx.replyWithHTML(
      `${
        element.date
      }:  ${element.cityFrom.toUpperCase()}-${element.cityTo.toUpperCase()} - ${
        element.price
      }-${element.driver.toUpperCase()} - ${element.carOwner.toUpperCase()}-${
        element.cargoOwner
      }\n${element.note ? element.note : "Нотаток немає"}`
    );
  }
});
bot.hears("Дохід", async (ctx) => {
  const newNote = await Notes.find({ status: "done" });
  const money = newNote
    .map((item) => +item.money)
    .reduce((prev, curr) => prev + curr, 0);
  console.log(money);
  await ctx.replyWithHTML(`Загальний заробіток становить: ${money} грн`);
});

bot.hears("Заявки не оплачені", async (ctx) => {
  const newNote = await Notes.find({ status: "undone" });
  await ctx.replyWithHTML(`Заявок: ${newNote.length}`);
  console.log(newNote);
  for (let i = 0; i < newNote.length; i++) {
    const element = newNote[i];

    ctx.replyWithHTML(
      `${
        element.date
      }:  ${element.cityFrom.toUpperCase()}-${element.cityTo.toUpperCase()} - ${
        element.price
      }-${element.driver.toUpperCase()} - ${element.carOwner.toUpperCase()}-${
        element.cargoOwner
      }\n${element.note ? element.note : "Нотаток немає"}`
    );
  }
});
bot.help((ctx) => ctx.reply("Send me a sticker"));
bot.on("sticker", (ctx) => ctx.reply("👍"));
bot.hears("hi", (ctx) => ctx.reply("Hey there"));
bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
