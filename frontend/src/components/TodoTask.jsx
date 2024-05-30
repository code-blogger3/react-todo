import { removeTodo, toggleTodo, updateTodo } from "@/redux/todo/todoSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { useUpdateTodo } from "@/hooks/useUpdateTodo";
import { useDeleteTodo } from "@/hooks/useDeleteTodo";

function TodoTask({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTodoValue, setEditTodoValue] = useState(todo?.name);
  const [completed, setCompleted] = useState(todo?.completed);

  const dispatch = useDispatch();
  const { mutate: mutateUpdate } = useUpdateTodo();
  const { mutate: mutateDelete } = useDeleteTodo();

  const editTodo = (todoID, name) => {
    // dispatch(updateTodo({ id: todo?.id, name }));
    mutateUpdate({ todoID, todoDetails: { name } });

    setIsEditing((prev) => !prev);
  };

  const toggleCompleteTodo = (todoID, completed) => {
    mutateUpdate({ todoID, todoDetails: { completed } });
    setCompleted((prev) => !prev);
  };
  // useEffect(() => {
  //   dispatch(toggleTodo({ id: todo?.id, completed }));
  // }, [completed]);
  return (
    <>
      <div className="">
        {isEditing ? (
          <div className="flex gap-1 justify-between" key={todo?._id}>
            <Input
              type="text"
              className="border-sky-400"
              value={editTodoValue}
              onChange={(e) => setEditTodoValue(e.target.value)}
            />
            <span className="flex gap-2">
              <button onClick={() => editTodo(todo?._id, editTodoValue)}>
                Save
              </button>
              <button onClick={() => setIsEditing((prev) => !prev)}>
                Cancel
              </button>
            </span>
          </div>
        ) : (
          <div
            className="flex  gap-3 justify-between py-[9px] "
            key={todo?._id}
          >
            <label>
              <Checkbox
                // className="items-baseline"
                checked={completed}
                onCheckedChange={() => toggleCompleteTodo(todo._id, !completed)}
                // onCheckedChange={() => }
              />
              <span className={`p-3 ${completed ? "line-through" : ""}`}>
                {todo?.name}
              </span>
            </label>
            <span className="flex gap-4">
              {/* <button onClick={() => dispatch(removeTodo(todo?.id))}>X</button> */}
              <button onClick={() => mutateDelete(todo?._id)}>X</button>
              <button onClick={() => setIsEditing((prev) => !prev)}>
                update
              </button>
            </span>
          </div>
        )}
      </div>
    </>
  );
}

export default TodoTask;
