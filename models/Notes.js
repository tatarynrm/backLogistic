import mongoose from "mongoose";

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
  },
  { timestamps: true }
);

const Notes = mongoose.model("Notes", NotesSchema);

export default Notes;
