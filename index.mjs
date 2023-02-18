import express from "express";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import connectDB from "./mongoDB/connect.js";
import { register } from "./controllers/auth.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import notesRouter from "./routes/notes.js";
const app = express();

dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 8800;

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/notes", notesRouter);
// app.use("/posts");

app.get("/", (req, res) => res.json("OK"));

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`SERVER Running on port :${PORT}`))
  )
  .catch((error) => console.log(error));
