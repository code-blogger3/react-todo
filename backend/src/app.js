import express from "express";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/Auth.js";
import { todoRouter } from "./routes/Todo.js";
import { userRouter } from "./routes/User.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

// routes import

app.use("/api/auth", authRouter);
app.use("/api/todo", todoRouter);
app.use("/api/user", userRouter);

export { app };
