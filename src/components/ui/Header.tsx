import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Divider, Popover } from "antd";
import { LOCAL_USER_LOGIN_KEY, PATH } from "constant";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { RootState } from "store";
import { quanLyNguoiDungAction } from "store/quanLyNguoiDung/slice";
import styled from "styled-components";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { userLogin } = useSelector(
    (state: RootState) => state.quanLyNguoiDung
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(userLogin !== null && userLogin !== undefined);
  }, [userLogin]);

  const removeUserLogin = () => {
    localStorage.removeItem(LOCAL_USER_LOGIN_KEY);
    dispatch(quanLyNguoiDungAction.updateUserLogin(null)); // dispatch action để cập nhật userLogin thành null
    setIsLoggedIn(false); // cập nhật trạng thái isLoggedIn
    navigate("/login");
  };
  // const [open, setOpen] = useState(false)

  const renderLogin = () => {
    if (!isLoggedIn) {
      return (
        <Fragment>
          <div className="items-center flex-shrink-0 hidden text-white lg:flex">
            <NavLink to={PATH.login}>
              <ButtonSignIn className="self-center px-8 rounded ">
                Đăng Nhập
              </ButtonSignIn>
            </NavLink>
            <NavLink to={PATH.register}>
              <ButtonSignUp className="self-center px-8  font-semibold rounded dark:bg-violet-600 dark:text-gray-50 ml-[15px]">
                Đăng Ký
              </ButtonSignUp>
            </NavLink>
          </div>
        </Fragment>
      );
    }
    if (userLogin && userLogin.hoTen ) {
      switch(userLogin.maLoaiNguoiDung) {
        case "KhachHang": return (
        
          <Fragment>
            <Popover
            
            content={
                <div>
                    <Button
                        type="text"
                        onClick={() => {
                            navigate(PATH.userInfo)
                        }}
                    >
                        Thông tin tài khoản
                    </Button>
                    <Divider className="py-10" />
                    <Button
                        type="primary"
                        danger
                        onClick={() => {
                          removeUserLogin();
                        }}
                    >
                        Đăng xuất
                    </Button>
                </div>
            }>
  
            <span className="text-white">
              Xin Chào, <span style={{ color: "#60b648" }}><Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} /> {userLogin.hoTen}</span>
            </span>
            </Popover>
          </Fragment>
        );
        case "QuanTri": return (
        
          <Fragment>
            <Popover
            
            content={
                <div>
                    <Button
                        type="text"
                        onClick={() => {
                            navigate(PATH.admin)
                        }}
                    >
                        Quản lý
                    </Button>
                    <Divider className="py-10" />
                    <Button
                        type="primary"
                        danger
                        onClick={() => {
                          removeUserLogin();
                        }}
                    >
                        Đăng xuất
                    </Button>
                </div>
            }>
  
            <span className="text-white">
              Xin Chào, <span style={{ color: "#60b648" }}><Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} /> {userLogin.hoTen}</span>
            </span>
            </Popover>
          </Fragment>
        );
      }
      
    }
  };
  console.log("userLoginHome: ",userLogin)

  return (
    <header
      style={{ top: 0 }}
      className=" dark:bg-gray-100 dark:text-gray-800 p-7 sticky z-10 w-full bg-opacity-50 bg-black"
    >
      <div className="container flex justify-between h-16 mx-auto">
        <a
          rel="noopener noreferrer"
          href="#"
          aria-label="Back to homepage"
          className="flex items-center p-2"
        >
          <img
            src="https://cybersoft.edu.vn/wp-content/uploads/2022/10/cyberlogo-white.png"
            alt="logo"
            style={{ width: 110 }}
          />
        </a>
        <ul className="items-stretch hidden space-x-3 lg:flex">
          <li className="flex">
            <NavLink
            style={{background: "none"}}
              to={"/"}
              rel="noopener noreferrer"
              className="flex items-center px-4 -mb-1 text-white "
            >
              Trang Chủ
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              to={"/contact"}
              rel="noopener noreferrer"
              className="flex items-center px-4 -mb-1 text-white "
            >
              Liên Hệ
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              to={"/news"}
              rel="noopener noreferrer"
              className="flex items-center px-4 -mb-1 text-white "
            >
              Tin Tức
            </NavLink>
          </li>
        </ul>
        {renderLogin()}
        <button className="p-4 lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-[20px] h-[20px] dark:text-gray-800"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

const ButtonSignUp = styled.div`
  background: linear-gradient(
    180deg,
    #50b648 0%,
    #90c63f 59.9%,
    #b2ec0f 99.48%
  );
  width: 120px;
  text-align: center;
  transition: all 0.5s ease-in-out;
  border-color: #90c63f;
  height: 39px;
  line-height: 39px;
  &:hover {
    background: linear-gradient(
      180deg,
      #60b648 100%,
      #90c63f 0%,
      #b2ec0f 0%
    ); /* Màu nền khi hover */
    color: white; /* Màu chữ khi hover */
    cursor: pointer; /* Đổi con trỏ thành dạng bàn tay khi hover */
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.1);
  }
`;
const ButtonSignIn = styled.div`
  background: transparent;
  width: 120px;
  text-align: center;
  border: 1px solid #90c63f;
  height: 39px;
  line-height: 39px;
  &:hover {
    background: #60b648; /* Màu nền khi hover */
    color: white; /* Màu chữ khi hover */
    cursor: pointer; /* Đổi con trỏ thành dạng bàn tay khi hover */
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.1);
  }
`;
