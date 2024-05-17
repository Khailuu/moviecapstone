import { useQuery } from "@tanstack/react-query"
import { qlNguoiDungServices } from "services"

export const useGetUserInfo = () => {
    const q = useQuery({
        queryKey: ['UserInfo'],
        queryFn: () => qlNguoiDungServices.getUserInfo(),
    })
    console.log(q)
    return {
        ...q,
        data: q?.data?.data.content
    }
}