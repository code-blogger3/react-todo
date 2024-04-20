import express from "express";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/Auth";

const app = express();

app.use(express.json());
app.use(cookieParser());

// routes import

app.use("/auth", authRouter);

export { app };
