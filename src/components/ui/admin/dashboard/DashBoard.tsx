import { useGetDanhSachNguoiDung } from "hooks/api/useGetDanhSachNguoiDung";
import { Input, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useDeleteNguoiDung } from "hooks/api/useDeleteNguoiDung";
import { NavLink } from "react-router-dom";
import { PATH } from "constant";
import type { SearchProps } from 'antd/es/input/Search';
import { useState } from "react";

interface DataType {
  taiKhoan: string;
  hoTen: string;
  email: string;
  soDT: string;
  matKhau: string;
  maLoaiNguoiDung: string;
}

export const DashBoard = () => {
  const { data: listNguoiDung } = useGetDanhSachNguoiDung();
  const { Search } = Input;

  const mutation = useDeleteNguoiDung();

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Họ Tên',
      dataIndex: 'hoTen',
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.taiKhoan.startsWith(value as string),
      width: '15%',
    },
    {
      title: 'Tài khoản',
      dataIndex: 'taiKhoan',
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.taiKhoan.startsWith(value as string),
      width: '10%',
    },
    {
      title: 'Mật Khẩu',
      dataIndex: 'matKhau',
      onFilter: (value, record) => record.matKhau.startsWith(value as string),
      filterSearch: true,
      width: '10%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      onFilter: (value, record) => record.email.startsWith(value as string),
      filterSearch: true,
      width: '20%',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'soDT',
      onFilter: (value, record) => record.soDT.startsWith(value as string),
      filterSearch: true,
      width: '15%',
    },
    {
      title: 'Mã loại người dùng',
      dataIndex: 'maLoaiNguoiDung',
      onFilter: (value, record) => record.maLoaiNguoiDung.startsWith(value as string),
      filterSearch: true,
      width: '10%',
    },
    {
      title: 'Hành Động',
      dataIndex: '',
      key: 'x',
      width: "10%",
      render: (_, nguoiDung) => {
        return (
          <div>
            <NavLink to={`${PATH.editNguoiDung}/${nguoiDung.taiKhoan}`}>
            <EditOutlined className="mr-[15px]" style={{ color: "blue" }} />
            </NavLink>
            <DeleteOutlined
              onClick={() => {  
                mutation.mutate(nguoiDung.taiKhoan, {
                  onSuccess: () => {
                    toast.success("Xoá Thành Công!");
                  }
                });
              }}
              className="mr-[15px]"
              style={{ color: "red" }}
            />
          </div>
        );
      },
    },
  ];

  
  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  const [filteredUser, setFilteredUser] = useState<DataType[]>([]);
  
  const onKeyUp: SearchProps['onKeyUp'] = (event) => {
    const input = event.target as HTMLInputElement;
    const inputLower = input.value.toLowerCase()
    const filtered = listNguoiDung?.filter((user: DataType) =>
    user.hoTen.toLowerCase().includes(inputLower)
    );
    setFilteredUser(filtered || []);
  };
  const data: DataType[] = (filteredUser.length > 0 ? filteredUser : listNguoiDung) as DataType[];
  
  return (
    <div>
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onKeyUp={onKeyUp}
        className="mb-[20px]"
      />
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
  );
};
