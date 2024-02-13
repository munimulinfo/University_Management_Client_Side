import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { routeGenaretor } from "../utils/routesGenaretor";
import adminPaths from "./admin.route";
import facultyPaths from "./faculty.routes";
import studentPaths from "./student.routes";
import ProtectRoute from "../Components/layout/ProtectRoute";
import ChangePassword from "../pages/ChangePassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectRoute role="undefined">
        <App />
      </ProtectRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectRoute role="admin">
        <App />
      </ProtectRoute>
    ),
    children: routeGenaretor(adminPaths),
  },
  {
    path: "/faculty",
    element: (
      <ProtectRoute role="faculty">
        <App />
      </ProtectRoute>
    ),
    children: routeGenaretor(facultyPaths),
  },
  {
    path: "/student",
    element: (
      <ProtectRoute role="student">
        <App />
      </ProtectRoute>
    ),
    children: routeGenaretor(studentPaths),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/change-password",
    element: <ChangePassword />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
