import { Layout, Menu } from "antd";
import { sidebarItemGenaretor } from "../../utils/sidebarItemGenaretor";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/featuers/auth/authSlice";
import adminPaths from "../../routes/admin.route";
import facultyPaths from "../../routes/faculty.routes";
import studentPaths from "../../routes/user.routes";
const { Sider } = Layout;
const userRole = {
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
  SUPER_ADMIN: "superAdmin",
};
const Sidebar = () => {
  const role = "admin";
  const user = useAppSelector(selectCurrentUser);
  let sidebarItems;

  switch (role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemGenaretor(adminPaths, userRole.ADMIN);
      break;
    case userRole.FACULTY:
      sidebarItems = sidebarItemGenaretor(facultyPaths, userRole.FACULTY);
      break;
    case userRole.STUDENT:
      sidebarItems = sidebarItemGenaretor(studentPaths, userRole.STUDENT);
      break;

    default:
      break;
  }
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{ height: "100vh", position: "sticky", left: "0", top: "0" }}
    >
      <div
        style={{
          color: "white",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>MH University</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
