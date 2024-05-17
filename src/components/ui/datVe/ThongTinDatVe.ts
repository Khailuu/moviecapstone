export class ThongTinDatVe {
    maLichChieu: number;
    danhSachVe: any[]; // specify the type of items if possible

    constructor(maLichChieu: number, danhSachVe: any[] = []) {
        this.maLichChieu = maLichChieu;
        this.danhSachVe = danhSachVe;
    }
}