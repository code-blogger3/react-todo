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
  todoReducer,
} from "@/utils/newTodoHelper";
import { Card } from "./ui/card";
import { usePostTodo } from "@/hooks/usePostTodo";
import { useAddTodoCategory } from "@/hooks/useAddTodoCategory";
import { loadUserData } from "@/redux/user/userSlice";

function NewTodo({ setOpenModal, modal }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [state, dispatcher] = useReducer(todoReducer, initialState);
  const [addTodoCatMode, setAddTodoCatMode] = useState(false);
  const [newTodoCategory, setNewTodoCategory] = useState("");
  const { mutate: mutatePost } = usePostTodo();
  const { data: NewUserData, mutate: mutateAddTodoCat } = useAddTodoCategory();
  const [todoCategoryOptions, setTodoCategoryOptions] = useState(
    user?.todoCategories
  );
  useEffect(() => {
    setTodoCategoryOptions(NewUserData?.data?.todoCategories);
  }, [NewUserData]);

  //+numbers are stored as string in state

  const [advanceMode, setAdvanceMode] = useState(
    localStorage.getItem("advanceMode") === "true" ? true : false
  );

  useEffect(() => {
    localStorage.setItem("advanceMode", advanceMode);
  }, [advanceMode]);

  const addNewTodoCategory = () => {
    mutateAddTodoCat(newTodoCategory);
    dispatch(loadUserData(NewUserData?.data));
    setAddTodoCatMode(false);
  };

  const resetFields = () =>
    dispatcher({ type: ACTIONS.CLEAR_FIELDS, payload: initialState });

  function createTodo() {
    // dispatch(addTodo({ ...state, id: randomId() }));
    mutatePost(state);
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
      <Card className="p-4 mx-4  ">
        <div className="flex w-auto max-w-[44rem] justify-end items-center gap-5 ">
          <Input
            type="text"
            placeholder="Enter task"
            id="todo_name"
            name="name"
            value={state.name}
            onChange={handleChangeInput}
          />
          <Button className="px-7" onClick={createTodo}>
            Add Task
          </Button>
        </div>

        <div className="my-4">
          {addTodoCatMode ? (
            <>
              <div className="flex w-auto max-w-[44rem] justify-end items-center gap-5">
                <Input
                  type="text"
                  placeholder="Enter Category"
                  name="todoCategory"
                  id=""
                  className=""
                  value={newTodoCategory}
                  onChange={(e) => setNewTodoCategory(e.target.value)}
                  // defaultValue={state.todoCategory}
                />
                <Button onClick={() => addNewTodoCategory()}>
                  Add Category
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center gap-7">
              <span className="font-semibold">Select a category</span>
              <Select
                name="todoCategory"
                id=""
                onValueChange={handleChangeTodoCatSelect}
              >
                <SelectTrigger className="w-[29rem]">
                  <SelectValue defaultValue={"None"} />
                  {/* <SelectValue placeholder="Select a category" /> */}
                  {/* <p>Select a category</p> */}
                </SelectTrigger>
                <SelectContent>
                  {todoCategoryOptions?.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                title="Add new todo category"
                onClick={() => setAddTodoCatMode(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </Button>
            </div>
          )}
        </div>
        {/* <br /> */}
        {advanceMode && (
          <div>
            <div className="flex items-center justify-center gap-6">
              <span className="font-semibold">
                Select importance and urgency
              </span>
              <Select
                name="importantUrgentCategory"
                id=""
                onValueChange={handleChangeImpUrgCatSelect}
                value={state.importantUrgentCategory}
              >
                <SelectTrigger className="w-[25rem]">
                  <SelectValue />
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
              <div className="flex items-center justify-center gap-6">
                <span className="font-semibold">Assign priority value</span>
                <Input
                  type="number"
                  name="PriorityNum"
                  onChange={handleChangeInput}
                  // disabled={localPriorityInputDisable}
                  // placeholder=""

                  className="mt-2 mb-2 w-[26rem]"
                  value={state.PriorityNum}
                />
              </div>

              <div className="flex items-center justify-center gap-7">
                <span className="font-semibold">Select priority label</span>
                <Select
                  name="PriorityText"
                  id=""
                  onValueChange={handleChangeLocCatSelect}
                  value={state.PriorityText}
                >
                  <SelectTrigger className="w-[28rem]">
                    <SelectValue placeholder="" />
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
