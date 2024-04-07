import React from "react";
import Todo from "./Todo";
import { useSelector } from "react-redux";

function TodoList() {
  const { todos } = useSelector((state) => state.todo);
  return (
    <section className="mt-6">
      {todos?.map((todo) => (
        <Todo todo={todo} />
      ))}
    </section>
  );
}

export default TodoList;
