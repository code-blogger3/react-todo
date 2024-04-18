import React from "react";
import NewTodo from "../components/NewTodo";
import TodoList from "../components/TodoList";

function CreateTodo() {
  return (
    <>
      <div className="max-w-3xl mx-auto  pt-[74px]">
        <NewTodo />
        <TodoList />
      </div>
    </>
  );
}

export default CreateTodo;
