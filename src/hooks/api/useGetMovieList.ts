import { useQuery } from "@tanstack/react-query"
import { quanLyPhimServices } from "services"
import { sleep } from "utils"

export const useGetMovieList = (tenPhim: string = "") => {
    const q = useQuery({
        queryKey: ['GetDanhSachPhim'],
        queryFn: async () => {
            await sleep(1000)
            return quanLyPhimServices.getMovieList(tenPhim)
        }
      })
      return {
        ...q,
        data: q?.data?.data.content
      }
}