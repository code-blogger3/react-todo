import { useState } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import { useDispatch } from "react-redux";
import { addTodo } from "./redux/todo/todoSlice";

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const dispatch = useDispatch();
  // console.log(newTodo);

  function createTodo() {
    dispatch(addTodo({ id: crypto.randomUUID(), title: newTodo }));
    setNewTodo("");
  }

  // console.log(todos);

  return (
    <>
      <div className="w-max mx-auto mt-5">
        <section className="flex gap-6">
          <input
            type="text"
            placeholder="Enter task"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)} //?
          />
          <button onClick={() => createTodo()}>Add</button>
        </section>
        <TodoList />
      </div>
    </>
  );
}

export default App;
