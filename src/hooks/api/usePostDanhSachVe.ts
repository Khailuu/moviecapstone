import { useMutation } from "@tanstack/react-query";
import { qlDatVeServices } from "services";
import { ThongTinDatVe } from "types";

export const usePostThongTinDatVe = () => {
  return useMutation({
    mutationFn: (thongTinDatVe: ThongTinDatVe) => {
      return qlDatVeServices.postThongTinDatVe(thongTinDatVe);
    },
  });
};
