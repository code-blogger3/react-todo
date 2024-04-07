import { useState } from "react";
import "./App.css";
import TodoList from "./components/TodoList";

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  // console.log(newTodo);

  function addTodo(title) {
    setTodos((currentTodos) => {
      return [{ id: crypto.randomUUID(), title }, ...currentTodos];
    });
    setNewTodo("");
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
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
          <button onClick={() => addTodo(newTodo)}>Add</button>
        </section>
        <TodoList />
      </div>
    </>
  );
}

export default App;
