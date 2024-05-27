import React from "react";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { useDispatch } from "react-redux";
import { updateTodo } from "@/redux/todo/todoSlice";
import { useUpdateTodo } from "@/hooks/useUpdateTodo";

function EditableCell({ getValue, row, column, table }) {
  const initialValue = getValue();
  const dispatch = useDispatch();
  const [value, setValue] = useState(initialValue);
  const { mutate: mutateUpdate } = useUpdateTodo();

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
    mutateUpdate({ todoID: row?.original._id, todoDetails: { name: value } });
    // dispatch(updateTodo({ id: row.original?.id, name: value }));
  };
  return (
    <Input
      value={value}
      className="border-none"
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
    />
  );
}

export default EditableCell;
