import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateAdmin from "../pages/admin/userManageMent/CreateAdmin";
import CreateFaculty from "../pages/admin/userManageMent/CreateFaculty";
import CreateStudent from "../pages/admin/userManageMent/CreateStudent";
import AcademicDepartment from "../pages/admin/academicManageMent/AcademicDepartment";
import AcademicFaculty from "../pages/admin/academicManageMent/AcademicFaculty";
import AcademicSemester from "../pages/admin/academicManageMent/AcademicSemester";
import CreateAcademicDepartment from "../pages/admin/academicManageMent/CreateAcademicDepartment";
import CreateAcademicFaculty from "../pages/admin/academicManageMent/CreateAcademicFaculty";
import CreateAcademicSemester from "../pages/admin/academicManageMent/CreateAcademicSemester";
import ProtectRoute from "./ProtectRoute";
import StudentData from "../pages/admin/userManageMent/StudentData";
import StudentDetails from "../pages/admin/userManageMent/StudentDetails";
import StudnetUpdate from "../pages/admin/userManageMent/StudnetUpdate";
import SemesterRegistration from "../pages/admin/courseManageMent/SemesterRegistration";
import RegisteredSemesters from "../pages/admin/courseManageMent/RegisteredSemesters";
import CreateCourse from "../pages/admin/courseManageMent/createCourse";
import Courses from "../pages/admin/courseManageMent/Courses";
import OfferCourse from "../pages/admin/courseManageMent/OfferCourse";
import OfferedCourse from "../pages/student/OfferedCourse";

const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: (
      <ProtectRoute>
        <AdminDashboard></AdminDashboard>
      </ProtectRoute>
    ),
  },
  {
    name: "Academic Management",
    children: [
      {
        name: "Create A. Semester",
        path: "create-academic-semester",
        element: <CreateAcademicSemester />,
      },
      {
        name: "Academic Semester",
        path: "academic-semester",
        element: <AcademicSemester />,
      },
      {
        name: "Create A. Faculty",
        path: "create-academic-faculty",
        element: <CreateAcademicFaculty />,
      },
      {
        name: "Academic Faculty",
        path: "academic-faculty",
        element: <AcademicFaculty />,
      },
      {
        name: "Create A. Department",
        path: "create-academic-department",
        element: <CreateAcademicDepartment />,
      },
      {
        name: "Academic Department",
        path: "academic-department",
        element: <AcademicDepartment />,
      },
    ],
  },
  {
    name: "UserManageMent",
    children: [
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent></CreateStudent>,
      },
      {
        name: "Students",
        path: "students-data",
        element: <StudentData />,
      },
      {
        path: "student-data/:studentId",
        element: <StudentDetails />,
      },
      {
        path: "student-update/:studentId",
        element: <StudnetUpdate />,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty></CreateFaculty>,
      },
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin></CreateAdmin>,
      },
    ],
  },
  {
    name: "Course Management",
    children: [
      {
        name: "Semester Registration",
        path: "semester-registration",
        element: <SemesterRegistration />,
      },
      {
        name: "Registered Semesters",
        path: "registered-semesters",
        element: <RegisteredSemesters />,
      },
      {
        name: "Create Course",
        path: "create-course",
        element: <CreateCourse />,
      },
      {
        name: "Courses",
        path: "courses",
        element: <Courses />,
      },
      {
        name: "Offer Course",
        path: "offer-course",
        element: <OfferCourse />,
      },
      {
        name: "Offered Courses",
        path: "offered-courses",
        element: <OfferedCourse />,
      },
    ],
  },
];

export default adminPaths;

// *************************Endddddddddd-Code*************************

//Programatical Way Route set

/// route set manualy
// type TRoute = {
//   path: string;
//   element: ReactNode;
// };

// export const adminRoutes = adminPaths.reduce((acc: TRoute[], item) => {
//   if (item.path && item.element) {
//     acc.push({
//       path: item.path,
//       element: item.element,
//     });
//   }

//   if (item.children) {
//     item.children.forEach((child) => {
//       acc.push({
//         path: child.path,
//         element: child.element,
//       });
//     });
//   }
//   return acc;
// }, []);

///side bar genaretor manualy

// type TSidebarItems = {
//   key: string;
//   label: ReactNode;
//   children?: TSidebarItems[];
// };

// export const adminSidebarItems = adminPaths.reduce(
//   (acc: TSidebarItems[], item) => {
//     if (item.name && item.path) {
//       acc.push({
//         key: item.name,
//         label: <NavLink to={`/admin/${item.path}`}>{item.name}</NavLink>,
//       });
//     }

//     if (item.children) {
//       acc.push({
//         key: item.name,
//         label: item.name,
//         children: item.children.map((child) => ({
//           key: child.name,
//           label: <NavLink to={`/admin/${child.path}`}>{child.name}</NavLink>,
//         })),
//       });
//     }
//     return acc;
//   },
//   []
// );

//! Hard coded way route set
// export const adminPaths = [
//   {
//     index: true,
//     element: <AdminDashboard />,
//   },
//   {
//     path: "dashboard",
//     element: <AdminDashboard />,
//   },
//   {
//     path: "create-student",
//     element: <CreateStudent />,
//   },
//   {
//     path: "create-admin",
//     element: <CreateAdmin />,
//   },
//   {
//     path: "create-faculty",
//     element: <CreateFaculty />,
//   },
// ];
