import { Router } from "express";
import { register } from "../controller/authContoller.js";

export const router = Router();

router.get("/", (req, res) => {
  res.json({
    message: "Auth routing working successfully",
  });
});

router.post("/register", register);
