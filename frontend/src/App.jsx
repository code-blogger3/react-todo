import "./App.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import CreateTodo from "./pages/CreateTodo";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";

function App() {
  const Layout = () => {
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    );
  };
  const BrowserRoutes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <CreateTodo /> },
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
  ]);
  return <RouterProvider router={BrowserRoutes} />;
}

export default App;
