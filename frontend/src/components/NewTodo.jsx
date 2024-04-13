import React, { useEffect, useReducer } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/todo/todoSlice";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const initialState = {
  id: "",
  name: "",
  completed: false,
  importantUrgentCategory: "None",
  todoCategory: "None",
  localPriorityText: "None",
  localPriorityNum: 0,
  globalPriorityText: "None",
  globalPriorityNum: 0,
};

const ACTIONS = {
  CHANGE_INPUT: "CHANGE_INPUT",
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.CHANGE_INPUT:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    default:
      return state;
  }
};

function NewTodo() {
  const ImpUrgCategoryOptions = [
    { value: "none", label: "None" },
    { value: "importantUrgent", label: "importantUrgent" },
    { value: "notImportantUrgent", label: "Not important and Urgent" },
    { value: "importantNotUrgent", label: "important and not Urgent" },
    { value: "notImportanNottUrgent", label: "Not important and Not Urgent" },
  ];

  const todoCategoryOptions = [
    { value: "none", label: "None" },
    {
      value: "study",
      label: "Study",
    },
    { value: "code", label: "Code" },
  ];

  const PriorityOptions = [
    {
      value: "none",
      label: "None",
    },
    { value: "highest", label: "Highest" },
    {
      value: "lowest",
      label: "Lowest",
    },
  ];

  const dispatch = useDispatch();
  const [state, dispatcher] = useReducer(todoReducer, initialState);

  const [advanceMode, setAdvanceMode] = useState(
    localStorage.getItem("advanceMode") === "true" ? true : false
  );
  useEffect(() => {
    localStorage.setItem("advanceMode", advanceMode);
  }, [advanceMode]);

  const randomId = () => Math.random().toString(36).substr(2, 10);
  // console.log(state);
  //+numbers are stored as string in state
  function createTodo() {
    dispatch(addTodo({ ...state, id: randomId() }));
  }

  const handleChange = (e) => {
    dispatcher({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  return (
    <>
      <main className="border-9 border-sky-500 min-w-96  ">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="text"
            placeholder="Enter task"
            id="todo_name"
            name="name"
            onChange={handleChange}
          />
          <Button onClick={() => createTodo()}>Add</Button>
        </div>

        <div className="mt-2">
          <div className="flex w-full max-w-sm items-center space-x-2 mb-3">
            <Input
              type="text"
              placeholder="Enter Category"
              name="todoCategory"
              id=""
              onChange={handleChange}
              // defaultValue={state.todoCategory}
            />
            <Button>Add Category</Button>
          </div>

          <Select name="" id="" onChange={handleChange}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
              {todoCategoryOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <br />
        {advanceMode && (
          <div>
            <div>
              <Select
                name="importantUrgentCategory"
                id=""
                onChange={handleChange}
              >
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Select importance and urgency" />
                </SelectTrigger>
                <SelectContent>
                  {ImpUrgCategoryOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Input
                type="number"
                name="localPriorityNum"
                onChange={handleChange}
                placeholder="Assign local priority value"
                className="mt-2 mb-2"
              />
              <Select name="localPriorityText" id="" onChange={handleChange}>
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Select local priority" />
                </SelectTrigger>
                <SelectContent>
                  {PriorityOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div>
                <Input
                  type="number"
                  name="globalPriorityNum"
                  onChange={handleChange}
                  placeholder="Assign global priority value"
                  className="mt-2 mb-2"
                />
                <Select name="globalPriorityText" id="" onChange={handleChange}>
                  <SelectTrigger className="w-[280px]">
                    <SelectValue placeholder="Select glocal priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {PriorityOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
        {advanceMode ? (
          <Button
            variant="secondary"
            onClick={() => setAdvanceMode((prev) => !prev)}
            className="mt-3"
          >
            Basic Mode
          </Button>
        ) : (
          <Button
            variant="secondary"
            onClick={() => setAdvanceMode((prev) => !prev)}
          >
            Advance Mode
          </Button>
        )}
      </main>
    </>
  );
}

export default NewTodo;
