import express from "express";
import {
  deleteUserTodo,
  postUserTodos,
  sendUserTodos,
  updateUserTodo,
} from "../controllers/Todo.js";

const router = express.Router();

router.route("/get/:userID").get(sendUserTodos);
router.route("/post").post(postUserTodos);
router.route("/delete/:todoID").delete(deleteUserTodo);
router.route("/update/:todoID").put(updateUserTodo);

export { router as todoRouter };
