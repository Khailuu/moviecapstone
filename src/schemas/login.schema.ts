import { z } from "zod";

export const loginSchema = z.object({
    taiKhoan: z.string({required_error: 'Please Enter User Name'}).min(1),
    matKhau: z.string({required_error: 'Please Enter Password'}).min(1),

})

export type LoginType = z.infer<typeof loginSchema>