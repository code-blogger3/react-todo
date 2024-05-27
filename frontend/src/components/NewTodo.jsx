import React, { useEffect, useReducer, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

function NewTodo({ setOpenModal, modal }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [state, dispatcher] = useReducer(todoReducer, initialState);

  // const [localPriorityInputDisable, setLocalPriorityInputDisable] =
  //   useState(false);

  // const randomId = () => Math.random().toString(36).substr(2, 10);

  //+numbers are stored as string in state

  const [advanceMode, setAdvanceMode] = useState(
    localStorage.getItem("advanceMode") === "true" ? true : false
  );

  useEffect(() => {
    localStorage.setItem("advanceMode", advanceMode);
  }, [advanceMode]);

  const postTodoApi = async (todoDetails) => {
    const res = await axios.post("/api/todo/post", {
      ...todoDetails,
      userRef: user?._id,
    });
    // const todoData = res?.data?.data;
    // console.log(todoData);
    // dispatch(addTodo({ todoData }));
    return res;
  };
  const queryClient = useQueryClient();
  const { data, mutate } = useMutation({
    mutationKey: ["create_todo"],
    mutationFn: postTodoApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["get_todos"]);
    },
  });

  const resetFields = () =>
    dispatcher({ type: ACTIONS.CLEAR_FIELDS, payload: initialState });

  function createTodo() {
    // dispatch(addTodo({ ...state, id: randomId() }));
    mutate(state);
    resetFields();
    if (modal) {
      setOpenModal(false);
    }
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
      payload: { name: "PriorityText", value }, // Hardcode the name or pass it from the component
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
                name="PriorityNum"
                onChange={handleChangeInput}
                // disabled={localPriorityInputDisable}
                placeholder="Assign priority value"
                className="mt-2 mb-2"
              />
              <Select
                name="localPriorityText"
                id=""
                onValueChange={handleChangeLocCatSelect}
              >
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Select priority" />
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
