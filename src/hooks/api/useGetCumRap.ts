import { useQuery } from "@tanstack/react-query"
import { quanLyRapServices } from "services"

export const useGetCumRap = (maHeThongRap: string) => {
    const q = useQuery({
        queryKey: ['GetCumRap'],
        queryFn: () => {
            return quanLyRapServices.getThongTinCumRapTheoHeThong(maHeThongRap)
        }
    })
    return {
        ...q,
        data: q.data?.data.content

    }
}