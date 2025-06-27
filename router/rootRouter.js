import { Router } from "express";
import { handleError } from "../utils/util.js";
import multer from "multer";
import pdf from "pdf-parse/lib/pdf-parse.js";
import { CohereClient } from "cohere-ai";
import { configDotenv } from "dotenv";

configDotenv();

const storage = multer.memoryStorage();
const upload = multer({ storage });
export const rootRouter = Router();
const cohere = new CohereClient({
  token: process.env.COHERE,
});

rootRouter.post("/summary", upload.single("pdf"), async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;

    const data = await pdf(fileBuffer);
    const chat = await cohere.chat({
      model: "command",
      message: `Summarize the following PDF content in simple English using bullet points. Limit the summary to a maximum of 10 bullet points only:\n\n${data.text}`,
    });

    res.json({
      success: true,
      summary: chat.text,
    });
  } catch (error) {
    handleError(error, `File Summary Error: ${error.message}`);
  }
});
