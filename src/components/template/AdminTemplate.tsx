import { useState, useEffect } from "react";
import { DesktopOutlined, FileOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { LOCAL_USER_LOGIN_KEY, PATH } from "constant";
import { useDispatch, useSelector } from "react-redux";
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

  const { userLogin } = useSelector((state: any) => state.quanLyNguoiDung)
  console.log(userLogin)

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

  if(userLogin?.maLoaiNguoiDung === "KhachHang") {
    navigate("/")
  }

  return (
    <Layout style={{ minHeight: "100vh" }}> 
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" selectedKeys={selectedKeys}>
        <NavLink to="/">
            <img

              src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png"
              className="my-[20px] p-1"
            />
          </NavLink>
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
            <p>Showtime</p>
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
        <Content>
          <div
            style={{
              margin: 20,
              padding: 24,
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
