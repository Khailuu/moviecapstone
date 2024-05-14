import { QUAN_LY_DAT_VE_API, apiInstance } from "constant"
import { QuanLyDatVe } from "types/QuanLyDatVe"

const api = apiInstance.create({
    baseURL: QUAN_LY_DAT_VE_API
})

export const qlDatVeServices = {
    layDanhSachPhongVe: (MALICHCHIEU?: number) => {
        return  api.get<HttpResponse<QuanLyDatVe>>(`/LayDanhSachPhongVe?MaLichChieu=${MALICHCHIEU}`)
    }
}