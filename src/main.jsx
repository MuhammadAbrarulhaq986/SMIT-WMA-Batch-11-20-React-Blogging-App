import { createRoot } from "react-dom/client";
import "./index.css"; // assuming you have a custom CSS file with Tailwind CSS classes
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout.jsx";
import Login from "./pages/Login.jsx";
import SingleBlog from "./pages/singleBlog.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/profile";
import CreateBlog from "./pages/addBlog.jsx";
// import ProtectedRoutes from "./components/ProtectedRoutes.jsx";
// import Dashboard from "./pages/Dashboard.jsx";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "profile/:id",
        element: <Profile />,
      },
      {
        path: "singleBlog/:blogId",
        element: <SingleBlog />,
      },
      {
        path: "createBlog/:userId",
        element: <CreateBlog />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}></RouterProvider>
);
