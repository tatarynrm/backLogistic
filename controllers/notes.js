import Notes from "../models/Notes.js";

export const getNotes = async (req, res) => {
  try {
    const notes = await Notes.find().populate("user").exec();
    res.status(200).json(notes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Notes.findById(id);
    res.status(200).json(note);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

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
      status,
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
      note: "",
      user: req.userId,
      status: "active",
    });
    const savedNote = await newNote.save();

    res.status(201).json(savedNote);
  } catch (err) {
    res.status(500).json({
      message: "Не вдалось створити нотатку",
    });
  }
};

export const deleteNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    Notes.findOneAndDelete(
      {
        _id: id,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Не вдалось видалити пост",
          });
        }
        if (!doc) {
          return res.status(404).json({
            message: "Пост не знайдено",
          });
        }
        res.json({
          success: true,
        });
      }
    );
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
      note: req.body.note,
    };

    const note = await Notes.findByIdAndUpdate(id, { $set: newNote });
    res.status(200).json(note);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
