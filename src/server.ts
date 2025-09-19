import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { corsConfig } from "./config/cors";
import { connectDB } from "./config/db";
import authRoutes from "./routes/authRoutes";
import projectRoutes from "./routes/projectRoutes";
import cookieParser from "cookie-parser";

dotenv.config();
connectDB();
const app = express();
app.use(cookieParser());
app.use(cors(corsConfig));
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

export default app;
