import bcrypt from "bcrypt";

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
