import React, { useEffect, useState } from "react";
import Todo from "./Todo";
import { useSelector } from "react-redux";

function TodoList() {
  const { todos } = useSelector((state) => state.todo);
  const [todosList, setTodoList] = useState(todos);
  useEffect(() => {
    setTodoList(todos);
  }, [todos]);

  return (
    <section className="mt-6">
      {todosList?.map((todo) => (
        <Todo todo={todo} />
      ))}
    </section>
  );
}

export default TodoList;
