import express from "express";
import {
  createNote,
  getNotes,
  getNoteById,
  deleteNoteById,
  updateNote,
  changeStatus,
  createDuplicateNote,
} from "../controllers/notes.js";
import checkAuth from "../middleware/checkAuth.js";
const router = express.Router();

router.route("/").post(checkAuth, createNote);
router.route("/duplicate").post(checkAuth, createDuplicateNote);
router.route("/").get(getNotes);
router.route("/:id").get(getNoteById);
router.route("/:id").delete(checkAuth, deleteNoteById);
router.route("/:id").put(checkAuth, updateNote);
router.route("/status/:id").put(changeStatus);

export default router;
