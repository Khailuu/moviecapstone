import { useState, useEffect } from "react";
import { DesktopOutlined, FileOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { LOCAL_USER_LOGIN_KEY, PATH } from "constant";
import { useDispatch } from "react-redux";
import { quanLyNguoiDungAction } from "store/quanLyNguoiDung/slice";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export const AdminTemplate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const themeToken = theme.useToken();
  const {
    token: { colorBgContainer = '#fff', borderRadiusLG = '4px' } = {}
  } = themeToken || {};

  const removeUserLogin = () => {
    localStorage.removeItem(LOCAL_USER_LOGIN_KEY);
    dispatch(quanLyNguoiDungAction.updateUserLogin(null)); 
    navigate("/login");
  };

  const getSelectedKeys = (pathname: any) => {
    if (pathname.startsWith(PATH.showtime)) {
      return [PATH.showtime];
    }
    return [pathname];
  };

  const [selectedKeys, setSelectedKeys] = useState(getSelectedKeys(location.pathname));

  useEffect(() => {
    setSelectedKeys(getSelectedKeys(location.pathname));
  }, [location.pathname]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" selectedKeys={selectedKeys}>
          <Menu.Item key={PATH.dashboard} icon={<UserOutlined />}>
            <NavLink to={PATH.dashboard}>Users</NavLink>
          </Menu.Item>
          <SubMenu key='sub1' icon={<FileOutlined />} title="Films">
            <Menu.Item key={PATH.films}>
              <NavLink to={PATH.films}>Films</NavLink>
            </Menu.Item>
            <Menu.Item key={PATH.addFilms}>
              <NavLink to={PATH.addFilms}>Add Films</NavLink>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key={PATH.showtime} icon={<DesktopOutlined />}>
            <NavLink to={PATH.showtime}>Showtime</NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer, marginBottom: 20 }}>
          <div className="flex items-center">
            <Button onClick={removeUserLogin} type="primary" className="ms-auto" danger>
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
