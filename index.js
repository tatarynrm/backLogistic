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

// TELEGRAM BOT USE
import { Telegraf } from "telegraf";
const bot = new Telegraf(process.env.BOT_TOKEN);
import Notes from "./models/Notes.js";
// ///////////////////////////////////////////////
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
//
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
// ok

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

export default start;
