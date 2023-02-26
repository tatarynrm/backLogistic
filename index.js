dotenv.config();
import express from "express";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import notesRouter from "./routes/notes.js";
import userRoutes from "./routes/user.js";
import cargoRoutes from "./ExternalAPI/Lardi-Trans/routes/cargo.js";
import { Telegraf } from "telegraf";

import Notes from "./models/Notes.js";
import { adminRights } from "./TelegramBot/botPermissions.js";
import { botStart } from "./TelegramBot/botCommands.js";
const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 8800;

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/notes", notesRouter);

// External API
app.use("/lardi", cargoRoutes);
//External API
const start = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose
      .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() =>
        app.listen(PORT, () => console.log(`SERVER Running on port :${PORT}`))
      );
  } catch (error) {
    console.log(error);
  }
};
start();

// experimental
export default start;

// Telegram BOT -----------------------------------------------------------------------------------------
export const bot = new Telegraf(process.env.BOT_TOKEN);
bot.command("start", async (ctx) => {
  if (adminRights(ctx)) {
    ctx.replyWithHTML("Оберіть тип заявки", {
      reply_markup: {
        keyboard: [
          [{ text: `Заявки в процесі` }, { text: `Заявки оплачені` }],
          [{ text: `Заявки не оплачені` }, { text: `Дохід` }],
        ],
        resize_keyboard: true,
      },
    });
  } else {
    ctx.reply("У вас немає доступу");
  }
});

const hears = ["Заявки в процесі", "Заявки оплачені", "Заявки не оплачені"];
const status = ["active", "done", "undone"];
const admins = [1240153142, 282039969];
const noteStatus = [
  { title: "Заявки в процесі", status: "active" },
  { title: "Заявки оплачені", status: "done" },
  { title: "Заявки не оплачені", status: "undone" },
];

for (let i = 0; i < noteStatus.length; i++) {
  const element = noteStatus[i];
  bot.hears(element.title, async (ctx) => {
    if (adminRights(ctx)) {
      const newNote = await Notes.find({ status: `${element.status}` });
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
    } else {
      await ctx.reply("Немає доступу");
    }
  });
}

bot.hears("Дохід", async (ctx) => {
  if (adminRights(ctx)) {
    const newNote = await Notes.find({ status: "done" });
    const money = newNote
      .map((item) => +item.money)
      .reduce((prev, curr) => prev + curr, 0);
    console.log(money);
    await ctx.replyWithHTML(`Загальний заробіток становить: ${money} грн`);
  } else {
    ctx.reply("Немає доступу");
  }
});

bot.hears("Погода", async (ctx) => {
  const chatId = ctx.message.chat.id; // the ID of the chat where the message was sent
  const messageId = ctx.message.message_id; // the ID of the message to forward
  // ctx.forwardMessage(chatId, messageId);
  // ctx.editMessageReplyMarkup()
  const message = ctx.message.text;
  const response = `You said "${message}". I'm just a bot, so I don't have much to say in response. But I'm here if you need me!`;
  ctx.reply(response);
});

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
// Telegram BOT END-----------------------------------------------------------------------------------------
