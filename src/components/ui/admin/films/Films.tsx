import { Button, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { Input } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import { DeleteOutlined, EditOutlined, FormOutlined } from "@ant-design/icons";
import { useDeletePhim } from "hooks/api/useDeletePhim";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { PATH } from "constant";
import { useGetMovieList } from "hooks/api/useGetMovieList";
const { Search } = Input;
const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);


export const Films = () => {

  const mutation = useDeletePhim()

  interface DataType {
    maPhim: number
      tenPhim: string
      biDanh: string
      trailer: string
      hinhAnh: string
      moTa: string
      maNhom: string
      ngayKhoiChieu: string
      danhGia: number
      hot: boolean
      dangChieu: boolean
      sapChieu: boolean
  }
  
  const { data: phimList, refetch } = useGetMovieList()
  
  const columns: TableColumnsType<DataType> = [
    {
      title: "maPhim",
      dataIndex: "maPhim",
      showSorterTooltip: { target: "full-header" },
      width: "10%",
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ["descend" , "ascend"],
    },
    {
      title: "Hình Ảnh",
      width: "10%",
      dataIndex: "hinhAnh",
      render: (_, film ) => {
        return (
          <>
            <img className="w-[70px] h-[70px]" src={film.hinhAnh} alt=".." />
          </>
        )
      }
    },
    {
      title: "Tên Phim",
      dataIndex: "tenPhim",
      sortDirections: ["descend"],
      width: "20%",
      onFilter: (value, record) => record.tenPhim.indexOf(value as string) === 0,
    },
    {
      title: "Mô Tả",
      dataIndex: "moTa",
      ellipsis: true,
      width: "40%"
    },
    {
      title: 'Hành Động',
      dataIndex: '',
      width: "20%",
      key: 'x',
      render: (_, film) => {
        return (
          <div>
            <EditOutlined className="mr-[15px]" style={{color: "blue"}} />
              <NavLink to={`${PATH.showtime}/${film.maPhim}`}>
                <FormOutlined className="mr-[15px]" style={{color: "green"}} onClick={() =>{
                }}/>
              </NavLink>
            <DeleteOutlined onClick={() => {
              mutation.mutate(film.maPhim, {
                onSuccess: () => {
                  refetch()
                  toast.success("Xoá Thành Công!")
                },
                onError: () => {
                  toast.error("Xoá không thành công!")
                }
              })
            }} className="mr-[15px]" style={{color: "red"}} />
          </div>
        )
      },
    },
  ];
  
  const data = phimList;
  
  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  
  return (
    <div>
      <h3
        style={{
          color: "#90c63f",
          fontSize: 30,
          fontWeight: "bold",
          marginBottom: 30,
        }}
      >
        Quản Lý Phim
      </h3>
      <Search
      placeholder="input search text"
      allowClear
      enterButton="Search"
      size="large"
      onSearch={onSearch}
      className="mb-[20px]"
    />
    <NavLink to={PATH.addFilms}>
    <Button className="!text-[#90c63f] mb-[30px]">
        Add New
    </Button>
    </NavLink>
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
    </div>
  );
};
