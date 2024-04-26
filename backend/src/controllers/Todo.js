import { TodoModel } from "../models/Todo.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
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

const deleteUserTodo = asyncHandler(async (req, res) => {
  const todoID = req.params.todoID;

  const result = await TodoModel.deleteOne({ _id: todoID });

  if (result.deletedCount > 0) {
    // Document was deleted successfully
    res.json(new ApiResponse(200, "todo deleted successfully."));
  } else {
    // No matching document found
    res.json(new ApiError(404, "todo not found."));
  }
});

const updateUserTodo = asyncHandler(async (req, res) => {
  const todoID = req.params.todoID;

  const todo = await TodoModel.findById(todoID);
  if (!todo) {
    res.json(new ApiError(404, "todo not found"));
  }

  const updatedTodo = await TodoModel.findByIdAndUpdate(todoID, req.body, {
    new: true,
  });

  res.json(new ApiResponse(200, "todo updated successfully", updatedTodo));
});

export { sendUserTodos, postUserTodos, deleteUserTodo, updateUserTodo };
