import Notes from "../models/Notes.js";

export const createNote = async (req, res) => {
  try {
    const {
      date,
      cityFrom,
      cityTo,
      price,
      money,
      driver,
      car,
      carOwner,
      cargoOwner,
    } = req.body;

    const newNote = new Notes({
      date,
      cityFrom,
      cityTo,
      price,
      money,
      driver,
      car,
      carOwner,
      cargoOwner,
    });
    const savedNote = newNote.save();

    res.status(201).json(savedNote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getNotes = async (req, res) => {
  const notes = await Notes.find();
  try {
    res.status(200).json(notes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getNotesById = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Notes.findById(id);
    res.status(200).json(note);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const deleteNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Notes.deleteOne({ _id: id });
    res.status(200).json(note);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const newNote = {
      date: req.body.date,
      cityFrom: req.body.cityFrom,
      cityTo: req.body.cityTo,
      price: req.body.price,
      money: req.body.money,
      driver: req.body.driver,
      car: req.body.car,
      carOwner: req.body.carOwner,
      cargoOwner: req.body.cargoOwner,
    };

    const note = await Notes.findByIdAndUpdate(id, { $set: newNote });
    res.status(200).json(note);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
