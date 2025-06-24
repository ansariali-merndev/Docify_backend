import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";

configDotenv();

const secretKey = process.env.JWT_SECRET;

export const generateToken = (username, id) => {
  return jwt.sign({ username, id }, secretKey, {
    expiresIn: "7d",
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, secretKey);
};
