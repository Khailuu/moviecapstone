import { QUAN_LY_RAP_API, apiInstance } from "constant";
import { CumRap, HeThongRap, Rap } from "types";

const api = apiInstance.create({
    baseURL: QUAN_LY_RAP_API
})

export const quanLyRapServices = {
    getThongTinLichChieuHeThongRap: () => api.get<HttpResponse<Rap[]>>('/LayThongTinLichChieuHeThongRap'),
    getThongTinHeThongRap: () => api.get<HttpResponse<HeThongRap>>('/LayThongTinHeThongRap'),
    getThongTinCumRapTheoHeThong: (maHeThongRap: string) => api.get<HttpResponse<CumRap[]>>(`/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`)
}