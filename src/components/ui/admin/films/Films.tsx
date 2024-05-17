import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { Input } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import { useGetPhimList } from "hooks/api";
import { DeleteOutlined, EditOutlined, FormOutlined } from "@ant-design/icons";
import { useDeletePhim } from "hooks/api/useDeletePhim";
import { toast } from "react-toastify";
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
  
  const { data: phimList } = useGetPhimList()
  
  const columns: TableColumnsType<DataType> = [
    {
      title: "maPhim",
      dataIndex: "maPhim",
      showSorterTooltip: { target: "full-header" },
      width: 200,
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ["descend" , "ascend"],
    },
    {
      title: "Hình Ảnh",
      width: 200,
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
      width: 400,
      onFilter: (value, record) => record.tenPhim.indexOf(value as string) === 0,
    },
    {
      title: "Mô Tả",
      dataIndex: "moTa",
      ellipsis: true,
      width: 550
    },
    {
      title: 'Hành Động',
      dataIndex: '',
      key: 'x',
      render: (_, film) => {
        return (
          <div>
            <EditOutlined className="mr-[15px]" style={{color: "blue"}} />
            <FormOutlined className="mr-[15px]" style={{color: "green"}} />
            <DeleteOutlined onClick={() => {
              mutation.mutate(film.maPhim)
              toast.success("Xoá Thành Công!")
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
      className="mb-[30px]"
    />
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
    </div>
  );
};
