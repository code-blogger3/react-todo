import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TodoTable from "./TodoTable";
import { columns } from "./columns";
import { useGetTodoList } from "@/hooks/useGetTodoList";

function TodoList() {
  const { todos } = useSelector((state) => state.todo);
  const { user } = useSelector((state) => state.user);
  const { data, isLoading } = useGetTodoList(user?._id);
  const [todosList, setTodoList] = useState(data);

  useEffect(() => {
    setTodoList(data);
  }, [data]);

  return (
    <section className="mt-6 mx-5">
      <TodoTable
        columns={columns}
        data={todosList}
        setData={setTodoList}
        isLoading={isLoading}
      />
    </section>
  );
}

export default TodoList;
