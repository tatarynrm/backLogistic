import express from "express";
import {
  createNote,
  getNotes,
  getNoteById,
  deleteNoteById,
  updateNote,
} from "../controllers/notes.js";
import checkAuth from "../middleware/checkAuth.js";
const router = express.Router();

router.route("/").post(checkAuth, createNote);
router.route("/").get(getNotes);
router.route("/:id").get(getNoteById);
router.route("/:id").delete(checkAuth, deleteNoteById);
router.route("/:id").put(checkAuth, updateNote);

export default router;
