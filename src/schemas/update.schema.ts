// In schemas.ts
import { z } from 'zod';

export const updateSchema = z.object({
    hoTen: z.string().nonempty("Full name is required"),
    taiKhoan: z.string().nonempty("User name is required"),
    matKhau: z.string().nonempty("Password is required"),
    email: z.string().email("Invalid email address").nonempty("Email is required"),
    soDt: z.string().nonempty("Phone number is required"),
    maNhom: z.string().nonempty("Group is required"),
    maLoaiNguoiDung: z.string().nonempty("User type is required") // Added field
});

export type UpdateType = z.infer<typeof updateSchema>;
