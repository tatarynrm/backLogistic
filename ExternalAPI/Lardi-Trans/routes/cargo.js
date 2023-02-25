import express from "express";
import { getMyCargo } from "../controllers/cargos.js";
const router = express.Router();

router.route("/cargo").get(getMyCargo);

export default router;
