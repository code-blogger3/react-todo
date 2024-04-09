import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { removeTodo, toggleTodo, updateTodo } from "../redux/todo/todoSlice";

function Todo({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTodoValue, setEditTodoValue] = useState(todo?.title);
  const [completed, setCompleted] = useState(todo?.completed);

  useEffect(() => {
    setEditTodoValue(todo?.title);
  }, [todo]);
  // console.log(editTodoValue);
  const dispatch = useDispatch();

  const editTodo = (title) => {
    dispatch(updateTodo({ id: todo?.id, title }));
    setIsEditing((prev) => !prev);
  };
  // useEffect(() => {
  //   dispatch(toggleTodo({ id: todo?.id, completed }));
  // }, [completed]);
  const handleToggle = () => {
    setCompleted((prev) => !prev);
    dispatch(toggleTodo({ id: todo?.id, completed: !completed }));
  };

  return (
    <>
      {isEditing ? (
        <div className="flex gap-1 justify-between" key={todo?.id}>
          <input
            type="text"
            className="border-sky-400"
            value={editTodoValue}
            onChange={(e) => setEditTodoValue(e.target.value)}
          />
          <span className="flex gap-2">
            <button onClick={() => editTodo(editTodoValue)}>Save</button>
            <button onClick={() => setIsEditing((prev) => !prev)}>
              Cancel
            </button>
          </span>
        </div>
      ) : (
        <div className="flex gap-3 justify-between" key={todo?.id}>
          <label>
            <input
              type="checkbox"
              checked={completed}
              onChange={handleToggle}
            />
            <span className={`p-3 ${completed ? "line-through" : ""}`}>
              {todo?.title}
            </span>
          </label>
          <span className="flex gap-4">
            <button onClick={() => dispatch(removeTodo(todo?.id))}>X</button>
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
