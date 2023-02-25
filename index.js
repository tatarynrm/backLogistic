dotenv.config();
import express from "express";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import request from "request";
// import checkAuth from "./middleware/checkAuth.js";
// import connectDB from "./mongoDB/connect.js";
// import { createNote } from "./controllers/notes.js";
// import { register, login, getMe } from "./controllers/auth.js";
import authRoutes from "./routes/auth.js";
import notesRouter from "./routes/notes.js";
import userRoutes from "./routes/user.js";
import cargoRoutes from "./ExternalAPI/Lardi-Trans/routes/cargo.js";
import axios from "axios";

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
async function start() {
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
}
start();
