import React, { useState } from "react";

function Todo({ todo }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <div>
          <input type="text" />
        </div>
      ) : (
        <div className="flex gap-3 justify-between" key={todo?.id}>
          <span>{todo?.title}</span>
          <span className="flex gap-4">
            <button onClick={() => deleteTodo?.(todo?.id)}>X</button>
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
