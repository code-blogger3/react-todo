import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeTodo } from "../redux/todo/todoSlice";

function Todo({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      {isEditing ? (
        <div>
          <input type="text" className="border-sky-400" />
          <button onClick={() => setIsEditing((prev) => !prev)}>Save</button>
          {/* saving and toggle */}
        </div>
      ) : (
        <div className="flex gap-3 justify-between" key={todo?.id}>
          <span>{todo?.title}</span>
          <span className="flex gap-4">
            <button onClick={() => dispatch(removeTodo(todo.id))}>X</button>
            <button onClick={() => setIsEditing((prev) => !prev)}>
              update
            </button>
          </span>
        </div>
      )}
    </>
  );
}

export default Todo;
