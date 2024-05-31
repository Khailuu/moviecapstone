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

export type HeThongRap = {
  maHeThongRap: string;
  tenHeThongRap: string;
  biDanh: string;
  logo: string
}

export type CumRap = {
  maCumRap: string;
  tenCumRap: string;
  diaChi: string;
  danhSachRap: []
}

export type ShowTimes = {
  lstCumRap: {
      danhSachPhim: {
          lstLichChieuTheoPhim: {
              maLichChieu: number;
              maRap: string;
              tenRap: string;
              ngayChieuGioChieu: string;
              giaVe: number;
          }[];
          maPhim: number;
          tenPhim: string;
          hinhAnh: string;
          hot: boolean;
          dangChieu: boolean;
          sapChieu: boolean;
      }[];
      maCumRap: string;
      tenCumRap: string;
      hinhAnh: string;
      diaChi: string;
  }[];

  maHeThongRap: string;
  tenHeThongRap: string;
  logo: string;
  mahom: string;
};

export type lstCumRap ={
  danhSachPhim: {
      lstLichChieuTheoPhim: {
          maLichChieu: number;
          maRap: string;
          tenRap: string;
          ngayChieuGioChieu: string;
          giaVe: number;
      }[];
      maPhim: number;
      tenPhim: string;
      hinhAnh: string;
      hot: boolean;
      dangChieu: boolean;
      sapChieu: boolean;
  }[];
  maCumRap: string;
  tenCumRap: string;
  hinhAnh: string;
  diaChi: string;
}
export type ShowTimesDetail = {
  heThongRapChieu: {
      cumRapChieu: {
          lichChieuPhim: {
              maLichChieu: string;
              maRap: string;
              tenRap: string;
              ngayChieuGioChieu: string;
              giaVe: number;
              thoiLuong: number;
          }[];
          maCumRap: string;
          tenCumRap: string;
          hinhAnh: string;
          diaChi: string;
      }[];
      maHeThongRap: string;
      tenHeThongRap: string;
      logo: string;
  }[];
  maPhim: number;
  tenPhim: string;
  biDanh: string;
  trailer: string;
  hinhAnh: string;
  moTa: string;
  maNhom: string;
  hot: boolean;
  dangChieu: boolean;
  sapChieu: boolean;
  ngayKhoiChieu: string;
  danhGia: number;
};