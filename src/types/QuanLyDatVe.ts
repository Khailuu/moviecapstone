export type ThongTinPhim = {
  diaChi: string;
  gioChieu: string;
  hinhAnh: string;
  maLichChieu: number;
  ngayChieu: string;
  tenCumRap: string;
  tenPhim: string;
  tenRap: string;
};

export type DanhSachGhe = [];

export type QuanLyDatVe = {
  thongTinPhim: ThongTinPhim;
  danhSachGhe: [];
};

export type Ghe = {
  daDat: boolean;
  giaVe: number;
  loaiGhe: string;
  maGhe: number;
  maRap: number;
  stt: string;
  taiKhoanNguoiDat: string;
  tenGhe: string;
};

export type ThongTinDatVe = {
  maLichChieu: number;
  danhSachVe: any[]; // specify the type of items if possible
}