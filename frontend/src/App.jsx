import "./App.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import CreateTodo from "./pages/CreateTodo";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadUserData } from "./redux/user/userSlice";
import { useQuery } from "react-query";
import Dashboard from "./pages/Dashboard";

function App() {
  const Layout = () => {
    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem("todo's_user"));
    useEffect(() => {
      if (user) {
        dispatch(loadUserData(user));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
      ],
    },
  ]);
  return <RouterProvider router={BrowserRoutes} />;
}

export default App;
