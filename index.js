import express from "express";
import { connectDB } from "./config/db.js";
import { router } from "./router/authRoute.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 5000;

app.use(cookieParser());
app.use(express.json());
app.use("/auth", router);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome back , I am Docify",
  });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`);
  });
});
