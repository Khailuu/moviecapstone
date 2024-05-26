import { ThongTinDatVe } from "components/ui/datVe/ThongTinDatVe"
import { QUAN_LY_DAT_VE_API, apiInstance } from "constant"
import { QuanLyDatVe, TaoLichChieu } from "types/QuanLyDatVe"

const api = apiInstance.create({
    baseURL: QUAN_LY_DAT_VE_API
})

export const qlDatVeServices = {
    layDanhSachPhongVe: (MALICHCHIEU?: number) => {
        return  api.get<HttpResponse<QuanLyDatVe>>(`/LayDanhSachPhongVe?MaLichChieu=${MALICHCHIEU}`)
    },
    postThongTinDatVe : (thongTinDatVe = new ThongTinDatVe(0, []))  => api.post<HttpResponse<ThongTinDatVe[]>>('/DatVe', thongTinDatVe),
    postTaoLichChieu: (taoLichChieu: TaoLichChieu) => api.post<HttpResponse<TaoLichChieu[]>>('/TaoLichChieu', taoLichChieu)
}
