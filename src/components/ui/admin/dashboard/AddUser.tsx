import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Radio } from "antd"; // Import Radio
import { PATH } from "constant";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateSchema } from "schemas";
import { RootState, useAppDispatch } from "store";
import { quanLyNguoiDungActionThunks } from "store/quanLyNguoiDung";
import { Update } from "types";

export const AddUser = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isFetchingPostNguoiDung } = useSelector(
    (state: RootState) => state.quanLyNguoiDung
  );

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Update>({
    resolver: zodResolver(updateSchema),
  });

  const onSubmit: SubmitHandler<Update> = (values) => {
    dispatch(quanLyNguoiDungActionThunks.postNguoiDung(values))
      .unwrap()
      .then(() => {
        toast.success("Register Success!");
        navigate(PATH.login);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.content);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-[#72be43] text-4xl font-[600] mb-[30px]">
          Register
        </h1>
        <div className="text-black mb-[6px] fw-bold">Họ Tên</div>
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
        <div className="text-black mb-[6px] fw-bold">Tài Khoản</div>
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
        <div className="text-black mb-[6px] fw-bold">Mật Khẩu</div>
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
        <div className="text-black mb-[6px] fw-bold">Email</div>
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
        <div className="text-black mb-[6px] fw-bold">Số Điện Thoại</div>
        <Controller
          control={control}
          name="soDt"
          render={({ field }) => (
            <Input {...field} className="!mb-20" placeholder="Phone Number" />
          )}
        />
        {errors?.soDt && (
          <p className="text-[red] text-[12px]">{errors.soDt?.message}</p>
        )}
        <div className="text-black mb-[6px] fw-bold">Mã Nhóm</div>
        <Controller
          control={control}
          name="maNhom"
          render={({ field }) => (
            <Input {...field} className="!mb-9" placeholder="group" />
          )}
        />
        {errors?.maNhom && (
          <p className="text-[red] text-[12px]">{errors.maNhom?.message}</p>
        )}
        <div className="text-black mb-[6px] fw-bold">Mã Loại Người Dùng</div>
        <Controller
          control={control}
          name="maLoaiNguoiDung"
          render={({ field }) => (
            <Radio.Group {...field} className="!mb-9">
              <Radio value="QuanTri">Quản Trị</Radio>
              <Radio value="KhachHang">Khách Hàng</Radio>
            </Radio.Group>
          )}
        />
        {errors?.maLoaiNguoiDung && (
          <p className="text-[red] text-[12px]">
            {errors.maLoaiNguoiDung?.message}
          </p>
        )}
        <Button
          className="col-6 !block"
          htmlType="submit"
          type="primary"
          size="large"
          loading={isFetchingPostNguoiDung}
        >
          Register
        </Button>
      </form>
    </div>
  );
};
