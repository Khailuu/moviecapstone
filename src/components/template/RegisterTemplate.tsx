import { Button, Input } from "antd";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterType, registerSchema } from "schemas";
// import { qlndServices } from "services";
import { Navigate, useNavigate } from "react-router-dom";
import { PATH } from "constant";
import { toast } from "react-toastify";
import { /*useDispatch*/ useSelector } from "react-redux";
import { quanLyNguoiDungActionThunks } from "store/quanLyNguoiDung";
// import { UnknownAction } from "@reduxjs/toolkit";
import { RootState, useAppDispatch } from "store";

export const RegisterTemplate = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const dispatch = useAppDispatch()
  const { isFetchingRegister, userLogin } = useSelector((state: RootState) => state.quanLyNguoiDung)
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
  });
  // const onSubmit: SubmitHandler<RegisterType> = async (value) => {
  //   try {
  //     await qlndServices.dangKy(value);
  //     toast.success("Register Success!");
  //     // redirect to login page if regis success
  //     navigate(PATH.login);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const onSubmit: SubmitHandler<RegisterType> = (values) => {
    // dispatch(quanLyNguoiDungActionThunks.registerThunk(123) as unknown as UnknownAction)
    dispatch(quanLyNguoiDungActionThunks.registerThunk(values)).unwrap().then(()=> {
      toast.success("Register Success!");
      // redirect to login page if regis success
      navigate(PATH.login);
    })
    .catch((err) => {
      toast.error(err?.response?.data?.content)
    })
  }
  if(userLogin) {
    return <Navigate to='/' />
  }
  return ( 
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
          <Input {...field} className="!mb-20" placeholder="Email" />
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
          <Input {...field} className="!mb-9" placeholder="group" />
        )}
      />
      {errors?.maNhom && (
        <p className="text-[red] text-[12px]">{errors.maNhom?.message}</p>
      )}

      <Button className="col-6" htmlType="submit" type="primary" size="large" loading={isFetchingRegister}>
        Register
      </Button>
      
    </form>
  );
};
