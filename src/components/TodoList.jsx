import React from "react";
import Todo from "./Todo";
import { useSelector } from "react-redux";

function TodoList() {
  const { todos } = useSelector((state) => state.todo);
  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }
  return (
    <section className="mt-6">
      {todos?.map((todo) => (
        <Todo todo={todo} />
      ))}
    </section>
  );
}

export default TodoList;
