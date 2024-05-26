import { useQuery } from "@tanstack/react-query"
import { quanLyPhimServices } from "services"

export const useGetThongTinPhim = (maPhim: number) => {
    const q = useQuery({
        queryKey: ['GetThongTinPhim'],
        queryFn: () => {
            return quanLyPhimServices.getThongTinPhim(maPhim)
        }
    })
    return {
        ...q,
        data: q.data?.data.content
    }
}