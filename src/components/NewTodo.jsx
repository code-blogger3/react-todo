import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/todo/todoSlice";

function NewTodo() {
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState({
    id: crypto.randomUUID(),
    name: "",
    completed: false,
    importantUrgentCatagory: "None",
    todoCatagory: "None",
    localPriorityText: "None",
    localPriorityNum: 0,
    globalPriorityText: "None",
    globalPriorityNum: 0,
  });
  const [advanceMode, setAdvanceMode] = useState(false);
  const handleChange = (e) => {
    if (e.target.id === "todo_name") {
      setNewTodo({
        ...newTodo,
        name: e.target.value,
      });
    }
  };

  function createTodo() {
    dispatch(addTodo({ ...newTodo }));
    setNewTodo({
      id: crypto.randomUUID(),
      name: "",
      completed: false,
    });
  }

  return (
    <>
      <section className="flex gap-6">
        <input
          type="text"
          placeholder="Enter task"
          id="todo_name"
          value={newTodo.name}
          onChange={handleChange}
        />
        <button onClick={() => createTodo()}>Add</button>
      </section>
      <br />
      <div className="flex">
        <input type="text" placeholder="Enter Catagory" name="" id="" />
        <button>Add Catagory</button>
        <select name="" id="">
          <option value="study">Study</option>
          <option value="Code">Code</option>
        </select>
      </div>
      <br />
      {advanceMode && (
        <div>
          <div>
            <span>Important & Urgent Catagory</span>
            <select name="" id="">
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
              <input type="number" />
              <select name="" id="">
                <option value="None">None</option>
                <option value="Highest">Highest</option>
                <option value="lowest">lowest</option>
              </select>
            </div>
            <div>
              <h6>Global priority</h6>
              <input type="number" />
              <select name="" id="">
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
