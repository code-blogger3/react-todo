import React from "react";
import Todo from "./Todo";

function TodoList({ todos }) {
  return (
    <section className="mt-6">
      {todos?.map((todo) => (
        <Todo todo={todo} />
      ))}
    </section>
  );
}

export default TodoList;
