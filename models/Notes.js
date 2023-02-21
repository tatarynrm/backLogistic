import mongoose, { mongo } from "mongoose";

const NotesSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    cityFrom: {
      type: String,
      required: true,
    },
    cityTo: {
      type: String,
      required: true,
    },
    price: {
      type: String,
    },
    money: {
      type: String,
    },
    driver: {
      type: String,
    },
    car: {
      type: String,
    },
    carOwner: {
      type: String,
    },
    cargoOwner: {
      type: String,
    },
    note: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Notes", NotesSchema);
