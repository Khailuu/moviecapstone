export type UserLogin = {
    taiKhoan: string
    hoTen: string
    email: string
    soDT: string
    maNhom: string
    maLoaiNguoiDung: string
    accessToken: string
}

enum MaLoaiNgioiDung {
    QUAN_TRI = 'QuanTri',
    KHACH_HANG = 'KhachHang',
}

type Ghe = {
    maHeThongRap: string
    tenHeThongRap: string
    maCumRap: string
    tenCumRap: string
    maRap: number
    tenRap: string
    maGhe: number
    tenGhe: string
}

type VePhim = {
    danhSachGhe: Ghe[]
    maVe: number
    ngayDat: string
    tenPhim: string
    hinhAnh: string
    giaVe: number
    thoiLuongPhim: number
}

export type TaiKhoan = {
    [x: string]: any
    length: number
    taiKhoan: string;
    hoTen: string;
    email: string;
    soDT: string;
    matKhau: string;
    maLoaiNguoiDung: string
}


// {
//     "taiKhoan": "AA123",
//     "hoTen": "Nguyen ",
//     "email": "teste32323@gmail.com",
//     "soDT": "0123456777",
//     "matKhau": "Nam1305.",
//     "maLoaiNguoiDung": "KhachHang"
//   },


export interface HistoRyBooking {
    tenPhim: string;
    maVe: number;
    ngayDat: string;
    giaVe: number;
    danhSachGhe: Ghe[];
    [key: string]: any; // Other properties if needed
  }
  

export type UserInfo = UserLogin & {
    loaiNguoiDung: {
        maLoaiNguoiDung: MaLoaiNgioiDung
        tenLoai: 'Quản Trị' | 'Khách Hàng'
    }
    thongTinDatVe: VePhim[]
}

export type Update = {
    taiKhoan: string;
    matKhau: string;
    email: string;
    soDt: string;
    maNhom: string;
    maLoaiNguoiDung: string;
    hoTen: string;
}



