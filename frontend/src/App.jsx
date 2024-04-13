import "./App.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import CreateTodo from "./pages/CreateTodo";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

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
      ],
    },
  ]);
  return <RouterProvider router={BrowserRoutes} />;
}

export default App;
