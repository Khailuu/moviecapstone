import { z } from "zod";

export const registerSchema = z.object({
    hoTen: z.string({required_error: 'Please Enter Full Name'}).min(1).max(20, "Max length only 20 character"),
    taiKhoan: z.string({required_error: "Please Enter User Name"}).min(1).max(20, "Max length only 20 character"),
    matKhau: z.string({required_error: "Please Enter Password"}).min(8, "Password must be min 8 character").max(20, "Max length only 20 character"),
    email: z.string({required_error: "Please Enter Email"}).email("Please Enter Correct Email"),
    soDt: z.string({required_error: "Please Enter Phone"}),
    maNhom: z.string({required_error: "Please Enter Group"}),
})

export type RegisterType = z.infer<typeof registerSchema>
