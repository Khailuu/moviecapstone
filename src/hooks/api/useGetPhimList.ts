import { useQuery } from "@tanstack/react-query"
import { quanLyPhimServices } from "services"
import { sleep } from "utils"

export const useGetPhimList = () => {
    const q = useQuery({
        queryKey: ['GetDanhSachPhim'],
        queryFn: async () => {
            await sleep(1000)
            return quanLyPhimServices.getPhimList()
        }
      })
      return {
        ...q,
        data: q?.data?.data.content
      }
}