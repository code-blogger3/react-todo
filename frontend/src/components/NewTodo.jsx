import React, { useEffect, useReducer, useRef } from "react";
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
import {
  ACTIONS,
  ImpUrgCategoryOptions,
  PriorityOptions,
  initialState,
  todoCategoryOptions,
  todoReducer,
} from "@/utils/newTodoHelper";
import { Card } from "./ui/card";

function NewTodo({ setOpenModal }) {
  const dispatch = useDispatch();
  const [state, dispatcher] = useReducer(todoReducer, initialState);

  // const [localPriorityInputDisable, setLocalPriorityInputDisable] =
  //   useState(false);

  const [advanceMode, setAdvanceMode] = useState(
    localStorage.getItem("advanceMode") === "true" ? true : false
  );

  useEffect(() => {
    localStorage.setItem("advanceMode", advanceMode);
  }, [advanceMode]);

  // const randomId = () => Math.random().toString(36).substr(2, 10);

  //+numbers are stored as string in state
  const resetFields = () =>
    dispatcher({ type: ACTIONS.CLEAR_FIELDS, payload: initialState });
  function createTodo() {
    // dispatch(addTodo({ ...state, id: randomId() }));
    resetFields();
    setOpenModal(false);
  }

  const handleChangeInput = (e) => {
    dispatcher({
      type: ACTIONS.CHANGE_INPUT,
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleChangeTodoCatSelect = (value) => {
    dispatcher({
      type: ACTIONS.CHANGE_INPUT,
      payload: { name: "todoCategory", value }, // Hardcode the name or pass it from the component
    });
  };
  const handleChangeImpUrgCatSelect = (value) => {
    dispatcher({
      type: ACTIONS.CHANGE_INPUT,
      payload: { name: "importantUrgentCategory", value }, // Hardcode the name or pass it from the component
    });
  };
  const handleChangeLocCatSelect = (value) => {
    dispatcher({
      type: ACTIONS.CHANGE_INPUT,
      payload: { name: "localPriorityCategory", value }, // Hardcode the name or pass it from the component
    });
  };
  const handleChangeGloCatSelect = (value) => {
    dispatcher({
      type: ACTIONS.CHANGE_INPUT,
      payload: { name: " globalPriorityCategory", value }, // Hardcode the name or pass it from the component
    });
  };

  return (
    <>
      <Card className="p-4 mx-4">
        <div className="flex w-full max-w-sm items-center space-x-2 md:max-w-md lg:max-w-lg">
          <Input
            type="text"
            placeholder="Enter task"
            id="todo_name"
            name="name"
            value={state.name}
            onChange={handleChangeInput}
          />
          <Button onClick={() => createTodo()}>Add</Button>
        </div>

        <div className="">
          <Input
            type="text"
            placeholder="Enter Category"
            name="todoCategory"
            id=""
            className="my-2"
            value={state.todoCategory}
            onChange={handleChangeInput}
            // defaultValue={state.todoCategory}
          />

          <Select
            name="todoCategory"
            id=""
            value={state.todoCategory}
            // defaultValue="none"
            onValueChange={handleChangeTodoCatSelect}
          >
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select a category" />
              {/* <p>Select a category</p> */}
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
                onValueChange={handleChangeImpUrgCatSelect}
                value={state.importantUrgentCategory}
                // defaultValue={state.importantUrgentCategory}
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
                onChange={handleChangeInput}
                // disabled={localPriorityInputDisable}
                placeholder="Assign local priority value"
                className="mt-2 mb-2"
              />
              <Select
                name="localPriorityText"
                id=""
                onValueChange={handleChangeLocCatSelect}
              >
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
                  onChange={handleChangeInput}
                  placeholder="Assign global priority value"
                  className="mt-2 mb-2"
                />
                <Select
                  name="globalPriorityText"
                  id=""
                  onValueChange={handleChangeGloCatSelect}
                >
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
      </Card>
    </>
  );
}

export default NewTodo;
