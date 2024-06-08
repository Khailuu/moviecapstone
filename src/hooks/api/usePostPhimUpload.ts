import { useMutation } from "@tanstack/react-query";
import { quanLyPhimServices } from "services";

export const usePostPhimUpload = () => {
  return useMutation({
    mutationFn: async (formGroup: FormData) => {
       try{
        return await quanLyPhimServices.editPhim(formGroup)        
       }catch (er: any){
        console.log(er?.response?.data)
       }
    }
  });
};
