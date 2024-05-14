import { useQuery } from "@tanstack/react-query"
import { qlDatVeServices } from "services"

export const useGetMaLichChieu = ( maLichChieu?: number ) => {
    console.log("maLichChieu: ",maLichChieu)
    const q = useQuery({
        queryKey: ['GetMaLichChieu'],
        queryFn: () => {
            return qlDatVeServices.layDanhSachPhongVe(maLichChieu)
        }
    })
    return {
        ...q,
        data: q.data?.data.content
    }
}
