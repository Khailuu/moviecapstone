import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button } from "ui";
import { useAuth } from "hooks";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { registerSchema, RegisterType } from "schemas";
import { useAppDispatch } from "store";
import { putUpdateInfoThunk } from "store/quanLyNguoiDung/thunk";
import { Update } from "types";

export const TabUserInfo = () => {
    const dispatch = useAppDispatch()
    const { userLogin } = useAuth();
    const {
        reset,
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<RegisterType>({
        resolver: zodResolver(registerSchema),
        mode: "onBlur"
    });


    const onSubmit: SubmitHandler<RegisterType> = (value) => {



        // dispatch actions getUsserByAccessToken
        const { taiKhoan, matKhau, email, soDt, maNhom, hoTen } = value;

        const updateData: Update = {
            taiKhoan,
            matKhau,
            email,
            soDt,
            maNhom,
            maLoaiNguoiDung: 'KhachHang',
            hoTen,
        };

        dispatch(putUpdateInfoThunk(updateData))
            .unwrap()
            .then(() => toast.success('Cập nhật thành công!'))
            .catch((err) => toast.error(err?.response?.data?.content));

    }

    useEffect(() => {
        reset({
            ...userLogin,
            soDt: userLogin?.soDT,
        });
    }, [reset, userLogin]);
    return (

        <form className="text-white" onSubmit={handleSubmit(onSubmit)}>
            <p className="text-20 font-600">Thông tin tài khoản</p>
            <Input
                label="Tài khoản"
                onChange={() => {}}
                id="taiKhoan"
                name="taiKhoan"
                register={register}
                error={errors?.taiKhoan?.message}
                
                className="[&>input]:bg-transparent [&>input]:border-white [&>input]:border"
            />
            <Input
                label="Mật khẩu mới"
                id="matKhau"
                name="matKhau"
                type="password"
                placeholder="Mật khẩu mới"
                register={register}
                error={errors?.matKhau?.message}
                className="[&>input]:bg-transparent [&>input]:border-white [&>input]:border"
            />
            <Input
                label="Họ Tên"
                name="hoTen"
                id="hoTen"
                register={register}
                error={errors?.hoTen?.message}
                className="[&>input]:bg-transparent [&>input]:border-white [&>input]:border"
            />
            <Input
                label="Email"
                id="email"
                name="email"
                error={errors?.email?.message}
                register={register}
                className="[&>input]:bg-transparent [&>input]:border-white [&>input]:border"
            />
            <Input
                label="Số điện thoại"
                id="soDt"
                name="soDt"
                register={register}
                error={errors?.soDt?.message}
                className="[&>input]:bg-transparent [&>input]:border-white [&>input]:border"
            />
            <Input
                label="Mã Nhóm"
                id="maNhom"
                name="maNhom"
                register={register}
                error={errors?.maNhom?.message}
                className="[&>input]:bg-transparent [&>input]:border-white [&>input]:border"
            />
            
            <div className="text-right mt-20">
                <Button htmlType="submit" type="primary" className="!h-[46px]" onClick={(event) => {
                    console.log(event.target);

                }}>
                    Hoàn thành chỉnh sửa
                </Button>
                
            </div>
        </form>
    );
};
