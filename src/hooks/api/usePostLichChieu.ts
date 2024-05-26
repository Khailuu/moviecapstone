import { useMutation } from "@tanstack/react-query"
import { qlDatVeServices } from "services"
import { TaoLichChieu } from "types"

export const usePostLichChieu = () => {
    return useMutation({
        mutationFn:async (taoLichChieu: TaoLichChieu) => {
            try {
                return await qlDatVeServices.postTaoLichChieu(taoLichChieu)
            }
            catch(err){
                console.log(err)
            }
        }
    })
}