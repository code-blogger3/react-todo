import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    loadTodo: (state, action) => {
      state.todos = action.payload; // don't know if it'll be obj or array
    },
    addTodo: (state, action) => {
      state.todos = [action.payload, ...state.todos];
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo?.id !== action.payload);
    },
    updateTodo: (state, action) => {
      const { id, name } = action.payload;
      state.todos = state.todos.map((todo) => {
        return todo?.id === id ? { ...todo, name: name } : todo;
      });
    },
    toggleTodo: (state, action) => {
      const { id, completed } = action.payload;

      state.todos = state.todos.map((todo) => {
        return todo?.id === id ? { ...todo, completed } : todo;
      });
    },
  },
});

export const { addTodo, removeTodo, updateTodo, toggleTodo, loadTodo } =
  todoSlice.actions;
export default todoSlice.reducer;
