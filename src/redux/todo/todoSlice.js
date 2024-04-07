import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    {
      id: "",
      title,
    },
  ],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos = [action.payload, ...state.todos];
    },
  },
});

export const { addTodo } = todoSlice.actions;
export default todoSlice.reducer;
