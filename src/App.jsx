import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CreateTodo from "./pages/CreateTodo";
import Home from "./pages/Home";

function App() {
  const BrowserRoutes = createBrowserRouter([
    { path: "/", element: <CreateTodo /> },
    {
      path: "/home",
      element: <Home />,
    },
  ]);
  return <RouterProvider router={BrowserRoutes} />;
}

export default App;
