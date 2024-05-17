import { useQuery } from "@tanstack/react-query"
import { qlDatVeServices } from "services"

export const useGetMaLichChieu = ( maLichChieu?: number ) => {
    const q = useQuery({
        queryKey: ['GetMaLichChieu'], // hoạt động như mảng dependency
        queryFn: () => {
            return qlDatVeServices.layDanhSachPhongVe(maLichChieu)
        }
    })
    return {
        ...q,
        data: q.data?.data.content
    }
}
