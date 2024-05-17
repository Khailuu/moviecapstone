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

export type UserInfo = UserLogin & {
    loaiNguoiDung: {
        maLoaiNguoiDung: MaLoaiNgioiDung
        tenLoai: 'Quản Trị' | 'Khách Hàng'
    }
    thongTinDatVe: VePhim[]
}
