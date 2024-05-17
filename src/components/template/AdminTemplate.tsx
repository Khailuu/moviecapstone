import { useState } from "react";
import { DesktopOutlined, FileOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LOCAL_USER_LOGIN_KEY, PATH } from "constant";
import { useDispatch } from "react-redux";
import { quanLyNguoiDungAction } from "store/quanLyNguoiDung/slice";
import SubMenu from "antd/es/menu/SubMenu";

const { Header, Content, Footer, Sider } = Layout;


export const AdminTemplate = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [collapsed] = useState(false);
  const themeToken = theme.useToken();
  const {
    token: { colorBgContainer = '#fff', borderRadiusLG = '4px' } = {}
  } = themeToken || {};

  const removeUserLogin = () => {
    localStorage.removeItem(LOCAL_USER_LOGIN_KEY);
    dispatch(quanLyNguoiDungAction.updateUserLogin(null)); // dispatch action để cập nhật userLogin thành null
    navigate("/login");
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" >
          <Menu.Item key='1' icon={<UserOutlined />}>
            <NavLink to={PATH.dashboard}>Users</NavLink>
          </Menu.Item>
          <SubMenu key='sub1' icon={<FileOutlined />} title="Films">
            <Menu.Item key="5" icon={<FileOutlined />}>
              <NavLink to={PATH.films}>Films</NavLink>
            </Menu.Item>
            <Menu.Item key='6' icon={<FileOutlined />}>
              <NavLink to={PATH.addFilms}>Add Films</NavLink>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key='2' icon={<DesktopOutlined />}>
              <NavLink to={PATH.showtime}>Showtime</NavLink>
            </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer, marginBottom: 20 }}>
          <div className="flex items-center">
            <Button onClick={() => {
                        removeUserLogin();
                      }} type="primary" className="ms-auto" danger>
              Đăng xuất
            </Button>
          </div>
        </Header>
        <Content style={{ minHeight: '100vh' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
