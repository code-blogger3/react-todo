import "./App.css";
import NewTodo from "./components/NewTodo";
import TodoList from "./components/TodoList";

function App() {
  return (
    <>
      <div className="w-max mx-auto mt-5">
        <NewTodo />
        <TodoList />
      </div>
    </>
  );
}

export default App;
