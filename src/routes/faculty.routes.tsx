import FacultyDashboard from "../pages/faculty/FacultyDashboard";
import OfferdCourse from "../pages/faculty/OfferdCourse";

const facultyPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <FacultyDashboard></FacultyDashboard>,
  },
  {
    name: "Offered Course",
    path: "offered-course",
    element: <OfferdCourse></OfferdCourse>,
  },
];

export default facultyPaths;
