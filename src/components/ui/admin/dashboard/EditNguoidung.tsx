import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from 'antd';
import { PATH } from 'constant';
import { useGetTimKiemNguoiDung } from 'hooks/api/useGetTimKiemNguoiDung';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UpdateType, updateSchema } from 'schemas';
import { RootState, useAppDispatch } from 'store';
import { quanLyNguoiDungActionThunks } from 'store/quanLyNguoiDung';
import { Update } from 'types';

export const EditNguoidung = () => {
    const { taiKhoan } = useParams<{ taiKhoan: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    
    interface UserInfo {
        email: string;
        hoTen: string;
        maLoaiNguoiDung: string;
        matKhau: string;
        soDT: string;
        taiKhoan: string;
        maNhom: "GP03"
    }
    
    const { isFetchingRegister } = useSelector((state: RootState) => state.quanLyNguoiDung);
    
    const { data: thongTinTK } = taiKhoan ? useGetTimKiemNguoiDung(taiKhoan) : { data: null };

    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<UpdateType>({
        resolver: zodResolver(updateSchema),
    });

    useEffect(() => {
        if (thongTinTK && thongTinTK.length > 0) {
            const userInfo = thongTinTK[0];
            setValue('hoTen', userInfo.hoTen);
            setValue('taiKhoan', userInfo.taiKhoan);
            setValue('matKhau', userInfo.matKhau);
            setValue('email', userInfo.email);
            setValue('soDt', userInfo.soDT);
            setValue('maLoaiNguoiDung', userInfo.maLoaiNguoiDung);
            setValue('maNhom', userInfo.maNhom)
        }
    }, [thongTinTK, setValue]);

    const onSubmit: SubmitHandler<Update> = (values) => {
        dispatch(quanLyNguoiDungActionThunks.postUpdateNguoiDungThunk(values))
            .unwrap()
            .then(() => {
                toast.success("Cập Nhật Người Dùng Thành Công!");
                navigate(PATH.dashboard);
            })
            .catch((err) => {
                toast.error(err?.response?.data?.content);
            });
    };

    if (!thongTinTK || thongTinTK.length === 0) {
        return <div>No user information found</div>;
    }

    return (
        <div>
            {thongTinTK.map((thongTin: UserInfo) => (
                <div key={thongTin.taiKhoan}>Cập nhật thông tin cho tài khoản: <b>{thongTin.taiKhoan}</b></div>
            ))}
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1 className="text-[#72be43] text-4xl font-[600] mb-[30px]">Register</h1>
                <div className="text-white mb-[6px] fw-bold">Full Name</div>
                <Controller
                    control={control}
                    name="hoTen"
                    render={({ field }) => (
                        <Input {...field} className="!mb-20" placeholder="Full Name" />
                    )}
                />
                {errors?.hoTen && (
                    <p className="text-[red] text-[12px]">{errors.hoTen?.message}</p>
                )}
                <div className="text-white mb-[6px] fw-bold">User Name</div>
                <Controller
                    control={control}
                    name="taiKhoan"
                    render={({ field }) => (
                        <Input {...field} className="!mb-20" placeholder="User Name" />
                    )}
                />
                {errors?.taiKhoan && (
                    <p className="text-[red] text-[12px]">{errors.taiKhoan?.message}</p>
                )}
                <div className="text-white mb-[6px] fw-bold">Password</div>
                <Controller
                    control={control}
                    name="matKhau"
                    render={({ field }) => (
                        <Input.Password
                            {...field}
                            className="!mb-20"
                            placeholder="Password"
                        />
                    )}
                />
                {errors?.matKhau && (
                    <p className="text-[red] text-[12px]">{errors.matKhau?.message}</p>
                )}
                <div className="text-white mb-[6px] fw-bold">Email</div>
                <Controller
                    control={control}
                    name="email"
                    render={({ field }) => (
                        <Input {...field} className="!mb-20" placeholder="Email" />
                    )}
                />
                {errors?.email && (
                    <p className="text-[red] text-[12px]">{errors.email?.message}</p>
                )}
                <div className="text-white mb-[6px] fw-bold">Phone</div>
                <Controller
                    control={control}
                    name="soDt"
                    render={({ field }) => (
                        <Input {...field} className="!mb-20" placeholder="Phone" />
                    )}
                />
                {errors?.soDt && (
                    <p className="text-[red] text-[12px]">{errors.soDt?.message}</p>
                )}
                <div className="text-white mb-[6px] fw-bold">Group</div>
                <Controller
                    control={control}
                    name="maNhom"
                    render={({ field }) => (
                        <Input {...field} className="!mb-9" placeholder="Group" />
                    )}
                />
                {errors?.maNhom && (
                    <p className="text-[red] text-[12px]">{errors.maNhom?.message}</p>
                )}
                <Controller
                    control={control}
                    name="maLoaiNguoiDung"
                    render={({ field }) => (
                        <Input {...field} className="!mb-9" placeholder="Group" />
                    )}
                />
                {errors?.maLoaiNguoiDung && (
                    <p className="text-[red] text-[12px]">{errors.maNhom?.message}</p>
                )}

                <Button className="col-6" htmlType="submit" type="primary" size="large" loading={isFetchingRegister}>
                    Cập Nhật
                </Button>
            </form>
        </div>
    );
};
