import express from "express";
import { getMyCargo, repeatMyCargo } from "../controllers/cargos.js";
const router = express.Router();

router.route("/cargo").get(getMyCargo);
router.route("/cargo/repeat").post(repeatMyCargo);

export default router;
