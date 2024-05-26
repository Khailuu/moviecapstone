import { useMutation } from "@tanstack/react-query";
import { quanLyPhimServices } from "services";

export const useUploadPhim = () => {
  return useMutation({
    mutationFn: async (formGroup: FormData) => {
       try{
        return await quanLyPhimServices.uploadPhim(formGroup)        
       }catch (er: any){
        console.log(er?.response?.data)
       }
    }
  });
};
