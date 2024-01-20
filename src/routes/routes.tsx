import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { routeGenaretor } from "../utils/routesGenaretor";
import adminPaths from "./admin.route";
import facultyPaths from "./faculty.routes";
import studentPaths from "./user.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: <App />,
    children: routeGenaretor(adminPaths),
  },
  {
    path: "/faculty",
    element: <App />,
    children: routeGenaretor(facultyPaths),
  },
  {
    path: "/student",
    element: <App />,
    children: routeGenaretor(studentPaths),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
