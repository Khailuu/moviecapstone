import { QUAN_LY_PHIM_API, apiInstance } from "constant"
import { Banner, Phim } from "types"

const api = apiInstance.create({
    baseURL: QUAN_LY_PHIM_API
})

export const quanLyPhimServices = {
    getPhimList: () => api.get<HttpResponse<Phim[]>>('/LayDanhSachPhim'),
    getBannerList: () => api.get<HttpResponse<Banner[]>>('/LayDanhSachBanner'),
    deletePhim: (maPhim: number) => api.delete(`/XoaPhim?=${maPhim}`)
}