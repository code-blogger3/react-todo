import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos = [action.payload, ...state.todos];
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo?.id !== action.payload);
    },
    updateTodo: (state, action) => {
      const { id, title, completed } = action.payload;
      state.todos = state.todos.map((todo) => {
        return todo?.id === id ? { id, title, completed } : todo;
      });
    },
  },
});

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
