import express from "express";
import { postUserTodos, sendUserTodos } from "../controllers/Todo.js";

const router = express.Router();

router.route("/get").get(sendUserTodos);
router.route("/post").post(postUserTodos);

export { router as todoRouter };
