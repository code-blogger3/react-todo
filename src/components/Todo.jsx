import React, { useState } from "react";

function Todo({ todo }) {
  const [isEditing, setIsEditing] = useState(true);
  return (
    <>
      {isEditing ? (
        <div>ll</div>
      ) : (
        <div className="flex gap-3 justify-between" key={todo?.id}>
          <span>{todo?.title}</span>
          <span className="flex gap-4">
            <button onClick={() => deleteTodo?.(todo?.id)}>X</button>
            <button onClick={() => handleUpdate(todo?.id)}>update</button>
          </span>
        </div>
      )}
    </>
  );
}

export default Todo;
