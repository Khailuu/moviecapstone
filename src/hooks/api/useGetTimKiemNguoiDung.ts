import { useQuery } from "@tanstack/react-query"
import { qlNguoiDungServices } from "services"

export const useGetTimKiemNguoiDung = (taiKhoan: string) => {
    const q = useQuery({
        queryKey: ['GetTimKiemNguoiDung'],
        queryFn: () => {
            return qlNguoiDungServices.getTimKiemNguoiDung(taiKhoan)
        }
    })
    return {
        ...q, 
        data: q?.data?.data.content
    }
}