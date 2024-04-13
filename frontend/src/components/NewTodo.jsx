import React, { useEffect, useReducer } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/todo/todoSlice";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

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
      <main>
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

        <br />
        <div className="flex">
          <input
            type="text"
            placeholder="Enter Category"
            name="todoCategory"
            id=""
            onChange={handleChange}
          />
          <button>Add Category</button>
          <select name="" id="" onChange={handleChange}>
            {todoCategoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <br />
        {advanceMode && (
          <div>
            <div>
              <span>Important & Urgent Category</span>
              <select
                name="importantUrgentCategory"
                id=""
                onChange={handleChange}
              >
                {ImpUrgCategoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <span>Set priority</span>
              <div>
                <h6>Local priority</h6>
                <input
                  type="number"
                  name="localPriorityNum"
                  onChange={handleChange}
                />
                <select name="localPriorityText" id="" onChange={handleChange}>
                  {PriorityOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <h6>Global priority</h6>
                <input
                  type="number"
                  name="globalPriorityNum"
                  onChange={handleChange}
                />
                <select name="globalPriorityText" id="" onChange={handleChange}>
                  {PriorityOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
        {advanceMode ? (
          <button onClick={() => setAdvanceMode((prev) => !prev)}>
            Basic Mode
          </button>
        ) : (
          <button onClick={() => setAdvanceMode((prev) => !prev)}>
            Advance Mode
          </button>
        )}
      </main>
    </>
  );
}

export default NewTodo;
