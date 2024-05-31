import { QUAN_LY_PHIM_API, apiInstance } from "constant"
import { Banner, Phim } from "types"

const api = apiInstance.create({
    baseURL: QUAN_LY_PHIM_API
})

export const quanLyPhimServices = {
    getPhimList: (query = "") => api.get<HttpResponse<Phim[]>>(`/LayDanhSachPhim${query}`),
    getBannerList: () => api.get<HttpResponse<Banner[]>>('/LayDanhSachBanner'),
    getThongTinPhim: (maPhim: number) => api.get<HttpResponse<Phim>>(`LayThongTinPhim?MaPhim=${maPhim}`),
    deletePhim: (maPhim: number) => api.delete(`/XoaPhim?=${maPhim}`),
    uploadPhim: (formGroup: FormData) => {
        console.log(formGroup)
        return api.post<HttpResponse<FormData[]>>('ThemPhimUploadHinh', formGroup)
    }
}