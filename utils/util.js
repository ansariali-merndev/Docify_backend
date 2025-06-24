import bcrypt from "bcrypt";
import { generateToken } from "./jwt.js";

export const handleError = (error, message) => {
  console.log(error);
  throw new Error(message);
};

export const hashingPassword = async (password) => {
  const saltRound = 10;
  return await bcrypt.hash(password, saltRound);
};

export const comparingPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const setTokenCookie = (res, user) => {
  try {
    const token = generateToken(user.username, user._id);

    res.cookie("jwtToken", token, {
      path: "/",
      httpOnly: true,
      maxAge: 1000 * 24 * 60 * 60,
    });
    return;
  } catch (error) {
    handleError(error, `Jwt Auth error: ${error.message}`);
  }
};
