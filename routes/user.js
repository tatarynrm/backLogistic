import express from "express";
import { getOneUser, getUsers } from "../controllers/users.js";
const router = express.Router();

router.route("/").get(getUsers);
router.route("/:id").get(getOneUser);

export default router;
