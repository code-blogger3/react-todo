import React from "react";
import TodoTask from "./TodoTask";

function MatrixList({ selectedTodos }) {
  return (
    <>
      <div className="py-5 px-3">
        {selectedTodos.map((todo) => (
          <TodoTask todo={todo} />
        ))}
      </div>
    </>
  );
}

export default MatrixList;
