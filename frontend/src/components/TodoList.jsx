import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TodoTable from "./TodoTable";
import { columns } from "./columns";

function TodoList() {
  const { todos } = useSelector((state) => state.todo);
  const [todosList, setTodoList] = useState(todos);
  let todosCount = todosList?.length;
  // console.log(todosCount);
  useEffect(() => {
    setTodoList(todos);
    todosCount = todosList?.length;
  }, [todos]);

  return (
    <section className="mt-6">
      <TodoTable columns={columns} data={todosList} todosCount={todosCount} />
    </section>
  );
}

export default TodoList;
