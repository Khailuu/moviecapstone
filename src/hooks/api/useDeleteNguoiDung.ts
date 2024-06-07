import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { qlNguoiDungServices } from "services";

export const useDeleteNguoiDung = () => {
    return useMutation({
        mutationFn: (taiKhoan: string) => {
            return qlNguoiDungServices.deleteNguoiDung(taiKhoan);
        },
        onError: (error: any) => {
            // Extract error message
            const errorMessage = error.response?.data?.content || "Đã xảy ra lỗi!";
            toast.error(errorMessage);
        }
    });
};
