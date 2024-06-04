import { useGetDanhSachNguoiDung } from "hooks/api/useGetDanhSachNguoiDung";
import { Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useDeleteNguoiDung } from "hooks/api/useDeleteNguoiDung";

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

  const mutation = useDeleteNguoiDung();

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Tài khoản',
      dataIndex: 'taiKhoan',
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.taiKhoan.startsWith(value as string),
      width: '15%',
    },
    {
      title: 'Mật Khẩu',
      dataIndex: 'matKhau',
      onFilter: (value, record) => record.matKhau.startsWith(value as string),
      filterSearch: true,
      width: '15%',
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
      width: '20%',
    },
    {
      title: 'Mã loại người dùng',
      dataIndex: 'maLoaiNguoiDung',
      onFilter: (value, record) => record.maLoaiNguoiDung.startsWith(value as string),
      filterSearch: true,
      width: '20%',
    },
    {
      title: 'Hành Động',
      dataIndex: '',
      key: 'x',
      render: (_, nguoiDung) => {
        return (
          <div>
            <EditOutlined className="mr-[15px]" style={{ color: "blue" }} />
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

  const data: DataType[] = (listNguoiDung ?? []) as DataType[];

  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <div>
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
  );
};
