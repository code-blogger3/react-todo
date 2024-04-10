import React from "react";
import NewTodo from "../components/NewTodo";
import TodoList from "../components/TodoList";

function CreateTodo() {
  return (
    <>
      <div className="w-max mx-auto mt-5">
        <NewTodo />
        <TodoList />
      </div>
    </>
  );
}

export default CreateTodo;
