import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { initiateDatabaseConnection } from "./models/index.js";
import { authRouter, postRouter } from "./routes/index.js";

dotenv.config();
initiateDatabaseConnection();
// const frontendUrl = process.env.FRONTEND_URL;
const PORT = process.env.PORT || 8000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(/*{ credentials: true, origin: frontendUrl }*/));
app.use(express.static("uploads"));
app.use("/auth", authRouter);
app.use("/posts", postRouter);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
