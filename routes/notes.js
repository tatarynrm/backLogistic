import express from "express";
import {
  createNote,
  getNotes,
  getNotesById,
  deleteNoteById,
  updateNote,
} from "../controllers/notes.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();

router.route("/").post(createNote);
router.route("/").get(getNotes);
router.route("/:id").get(getNotesById);
router.route("/:id").delete(deleteNoteById);
router.route("/:id").put(updateNote);

// доступ з авторизацією
// router.route("/").post(verifyToken, createNote);
// router.route("/").get(verifyToken, getNotes);
export default router;
