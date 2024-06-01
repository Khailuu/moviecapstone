import { useQuery } from "@tanstack/react-query"
import { qlNguoiDungServices } from "services"

export const useGetDanhSachNguoiDung = () => {
    const q = useQuery({
        queryKey: ['GetDanhSachNguoiDung'],
        queryFn: () => {
            return qlNguoiDungServices.getDanhSachNguoiDung()
        }
    })
    return {
        ...q,
        data: q?.data?.data.content
    }
}