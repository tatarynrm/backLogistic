import express from "express";
import { getMe, login, register } from "../controllers/auth.js";
import checkAuth from "../middleware/checkAuth.js";
import {
  loginValidation,
  registerValidation,
} from "../validations/validations.js";
const router = express.Router();

router.route("/login").post(loginValidation, login);
router.route("/register").post(registerValidation, register);
router.route("/me").get(checkAuth, getMe);

export default router;
