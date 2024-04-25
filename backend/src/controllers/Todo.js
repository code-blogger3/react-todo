import { TodoModel } from "../models/Todo.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const sendUserTodos = asyncHandler(async (req, res) => {
  const userID = req.params.userID;

  const todos = await TodoModel.find({
    // useRef: { $in: [userID] },
    userRef: userID,
  }); //sort with date

  if (todos.length > 0) {
    return res.json(new ApiResponse(200, "todos are send", todos));
  } else {
    return res.json(new ApiResponse(200, "no todos found"));
  }
});

const postUserTodos = asyncHandler(async (req, res) => {
  //   const useRef = req.params.userID;
  const frontendTodo = req.body; // correct for data from frontend
  // check user exist

  const newTodo = new TodoModel({
    ...frontendTodo,
    // useRef,
  });

  const result = await newTodo.save();

  res.json(new ApiResponse(200, "todo posted successfully", result));
});

export { sendUserTodos, postUserTodos };
