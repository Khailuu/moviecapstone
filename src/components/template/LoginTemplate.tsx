//rafc
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from 'antd'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate, Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { LoginType, loginSchema } from 'schemas'
import { RootState, useAppDispatch } from 'store'
import { quanLyNguoiDungActionThunks } from 'store/quanLyNguoiDung'

export const LoginTemplate = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { isFetchingLogin, userLogin } = useSelector((state: RootState) => state.quanLyNguoiDung)
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginType>({
        resolver: zodResolver(loginSchema),
    })
    console.log("userloginTemplate:",userLogin)

    const onSubmit: SubmitHandler<LoginType> = (values) => {
      dispatch(quanLyNguoiDungActionThunks.loginThunk(values)).unwrap().then(()=> {
        toast.success('Login Success')
        navigate('/')
      })
      .catch((err) => {
        toast.error(err?.response?.data?.content)
      })
    }
    if(userLogin) {
        return <Navigate to='/' />
    }

    return (
        <form className="text-white" onSubmit={handleSubmit(onSubmit)}>
                  <h1 className="text-[#72be43] text-4xl font-[600] mb-[30px]">Login</h1>


            <div className="mt-20">
                <p className="mb-10">User Name</p>
                <Controller
                    control={control}
                    name="taiKhoan"
                    render={({ field }) => <Input {...field} />}
                />
                {!!errors?.taiKhoan && (
                    <p className="text-red-500 text-12">{errors.taiKhoan.message}</p>
                )}
            </div>
            <div className="mt-20">
                <p className="mb-10">Password</p>
                <Controller
                    control={control}
                    name="matKhau"
                    render={({ field }) => <Input.Password {...field} />}
                />
                {!!errors?.matKhau && (
                    <p className="text-red-500 text-12">{errors.matKhau.message}</p>
                )}
            </div>

            <div className="text-center mt-20">
                <Button  loading={isFetchingLogin} htmlType="submit" style={{backgroundColor: "#72be43", border:"none"}} size='large' className='!text-white w-[100%]' >
                    Login
                </Button>
            </div>
        </form>
    )
}
