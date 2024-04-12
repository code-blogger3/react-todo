import React, { useReducer } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/todo/todoSlice";

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
  const dispatch = useDispatch();
  const [state, dispatcher] = useReducer(todoReducer, initialState);
  const [newTodo, setNewTodo] = useState({});
  const [advanceMode, setAdvanceMode] = useState(false);
  // const handleChange = (e) => {
  //   if (e.target.id === "todo_name") {
  //     setNewTodo({
  //       ...newTodo,
  //       name: e.target.value,
  //     });
  //   }
  // };

  function createTodo() {
    dispatch(addTodo({ ...state }));
    // setNewTodo({
    //   id: crypto.randomUUID(),
    //   name: "",
    //   completed: false,
    // });
  }

  const handleChange = (e) => {
    dispatcher({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  return (
    <>
      <section className="flex gap-6">
        <input
          type="text"
          placeholder="Enter task"
          id="todo_name"
          name="name"
          value={newTodo.name}
          onChange={handleChange}
        />
        <button onClick={() => createTodo()}>Add</button>
      </section>
      <br />
      <div className="flex">
        <input
          type="text"
          placeholder="Enter Category"
          name="todoCategory"
          id=""
        />
        <button>Add Category</button>
        <select name="" id="">
          <option value="study">Study</option>
          <option value="Code">Code</option>
        </select>
      </div>
      <br />
      {advanceMode && (
        <div>
          <div>
            <span>Important & Urgent Category</span>
            <select name="importantUrgentCategory" id="">
              <option value="None">None</option>
              <option value="importantUrgent">importantUrgent</option>
              <option value="NotimportantUrgent">
                Not important and Urgent
              </option>
              <option value="importantNotUrgent">
                important and not Urgent
              </option>
              <option value="NotimportanNottUrgent">
                Not important and Not Urgent
              </option>
            </select>
          </div>
          <div>
            <span>Set priority</span>
            <div>
              <h6>Local priority</h6>
              <input type="number" name="localPriorityNum" />
              <select name="localPriorityText" id="">
                <option value="None">None</option>
                <option value="Highest">Highest</option>
                <option value="lowest">lowest</option>
              </select>
            </div>
            <div>
              <h6>Global priority</h6>
              <input type="number" name="globalPriorityNum" />
              <select name="globalPriorityText" id="">
                <option value="None">None</option>
                <option value="Highest">Highest</option>
                <option value="lowest">lowest</option>
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
    </>
  );
}

export default NewTodo;
