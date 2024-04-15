import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TodoTable from "./TodoTable";
import { columns } from "./columns";

function TodoList() {
  const { todos } = useSelector((state) => state.todo);
  const [todosList, setTodoList] = useState(todos);

  useEffect(() => {
    setTodoList(todos);
  }, [todos]);

  return (
    <section className="mt-6">
      <TodoTable columns={columns} data={todosList} />
    </section>
  );
}

export default TodoList;
