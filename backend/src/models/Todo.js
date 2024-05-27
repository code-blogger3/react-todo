import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  name: { type: String },
  completed: { type: Boolean, default: false },
  importantUrgentCategory: String,
  todoCategory: String,
  PriorityNum: { type: Number, default: 0 },
  PriorityText: String,
  userRef: { type: String },
});

export const TodoModel = mongoose.model("Todo", TodoSchema);
