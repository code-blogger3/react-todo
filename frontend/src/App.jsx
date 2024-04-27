import "./App.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import CreateTodo from "./pages/CreateTodo";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { signInUser } from "./redux/user/userSlice";
import { useQuery } from "react-query";

function App() {
  const Layout = () => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("todo's_user"));
    useEffect(() => {
      if (user) {
        dispatch(signInUser(user));
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
      ],
    },
  ]);
  return <RouterProvider router={BrowserRoutes} />;
}

export default App;
