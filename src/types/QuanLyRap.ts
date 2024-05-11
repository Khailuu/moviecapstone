export type Rap = {
  logo: string;
  lstCumRap: [LstCumRap];
  maHeThongRap: string;
  manhom: string;
  tenHeThongRap: string;
};
export type LstCumRap = {
  danhSachPhim: any[];
  diaChi: string;
  hinhAnh: string;
  maCumRap: string;
  tenCumRap: string;
};

export type phim = {
  dangChieu: boolean;
  hinhAnh: string;
  hot: boolean;
  lstLichChieuTheoPhim: any[];
  maPhim: string;
  sapChieu: boolean;
  tenPhim: string;
};

