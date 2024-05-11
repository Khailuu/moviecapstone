import { useQuery } from "@tanstack/react-query"
import { quanLyPhimServices } from "services"

export const useGetBannerList = () => {
    const q = useQuery({
        queryKey: ['GetBannerPhim'],
        queryFn: () => {
            return quanLyPhimServices.getBannerList()
        }
    })
    
    return {
        ...q,
        data: q?.data?.data.content
    } 
}