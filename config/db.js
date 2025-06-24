import { configDotenv } from "dotenv";
import mongoose from "mongoose";

configDotenv();

export const connectDB = async () => {
  const URI = process.env.MONGODBURI;

  try {
    if (mongoose.connection.readyState === 1) {
      console.log("db Already connected");
      return;
    }
    await mongoose.connect(URI, {
      dbName: "docify",
    });
    console.log("db connected successfully");
  } catch (error) {
    console.log("db connection failed: ", error.message);
    throw error;
  }
};
