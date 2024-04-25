import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  name: { type: String },
  completed: { type: Boolean, default: false },
  importantUrgentCategory: String,
  todoCategory: String,
  localPriorityNum: { type: Number, default: 0 },
  localPriorityCategory: String,
  globalPriorityCategory: String,
  globalPriorityNum: { type: Number, default: 0 },
  useRef: { type: String, required: true },
});

export const TodoModel = mongoose.model("Todo", TodoSchema);

// const initialState = {
//   id: "",
//   name: "",
//   completed: false,
//   importantUrgentCategory: "None",
//   todoCategory: "",
//   localPriorityCategory: "None",
//   localPriorityNum: 0,
//   globalPriorityCategory: "None",
//   globalPriorityNum: 0,
// };
