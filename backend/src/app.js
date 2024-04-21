import express from "express";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/Auth.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

// routes import

app.use("/api/auth", authRouter);

export { app };
