import { Outlet } from "react-router-dom";
import { Button, Layout } from "antd";
import Sidebar from "./Sidebar";

const { Header, Content } = Layout;
const MainLayOut = () => {
  return (
    <Layout style={{ height: "100%" }}>
      <Sidebar></Sidebar>
      <Layout>
        <Header>
          <Button>Logout</Button>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet></Outlet>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayOut;
