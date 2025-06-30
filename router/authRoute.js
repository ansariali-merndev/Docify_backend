import { Router } from "express";
import {
  googleLogin,
  home,
  login,
  logout,
  register,
  verify,
} from "../controller/authContoller.js";

export const router = Router();

router.get("/", home);
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/verify", verify);
router.get("/google", googleLogin);
