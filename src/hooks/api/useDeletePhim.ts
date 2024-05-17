import { useMutation } from "@tanstack/react-query"
import { quanLyPhimServices } from "services"

export const useDeletePhim = () => {
  return useMutation({
    mutationFn: (maPhim: number) => {
        return quanLyPhimServices.deletePhim(maPhim)
    },
  })
}
