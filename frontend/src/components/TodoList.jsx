import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TodoTable from "./TodoTable";
import { columns } from "./columns";
import { useGetTodoList } from "@/hooks/useGetTodoList";

function TodoList() {
  const { todos } = useSelector((state) => state.todo);
  const { user } = useSelector((state) => state.user);
  const { data } = useGetTodoList(user?._id);
  const [todosList, setTodoList] = useState(data);
  console.log(data);

  useEffect(() => {
    setTodoList(data);
  }, [data]);

  return (
    <section className="mt-6 mx-5">
      <TodoTable columns={columns} data={todosList} setData={setTodoList} />
    </section>
  );
}

export default TodoList;
