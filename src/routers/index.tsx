import { AdminLayout, AuthLayout, MainLayout } from 'layouts'
import { PATH } from 'constant'
import { Admin, DatVe, Home, Login, MovieDetail, Register } from 'pages'
import { RouteObject, useRoutes } from 'react-router-dom'
import { UserInfo } from 'pages/UserInfo'
import { DashBoard } from 'components/ui/admin/dashboard'
import { AddFilms, Films } from 'components/ui/admin/films'
import { Showtime } from 'components/ui/admin/showtime'
import { KetQuaDatVe } from 'components/ui/datVe/KetQuaDatVe'
import { EditNguoidung } from 'components/ui/admin/dashboard/EditNguoidung'
import { EditFilm } from 'components/ui/admin/films/EditFilm'



const router: RouteObject[] = [
    {   
        element: <AuthLayout />,
        children: [
            {
                path: PATH.login,
                element: <Login />
            }, 
            {
                path: PATH.register,
                element: <Register />
            }
        ],
        
    },
    {
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: `${PATH.datVe}`,
                element:  <DatVe />,
                children: [
                    {
                        path: `${PATH.datVe}/:maLichChieu`
                    },
                    {
                        path: PATH.ketquadatve,
                        element: <KetQuaDatVe />
                    }
                ]
            },
            {
                path: PATH.userInfo,
                element: <UserInfo />,
            },
            {
                path: PATH.movieDetail,
                element: <MovieDetail />,
            },
        ]
    }, {
        element: <AdminLayout />,
        children: [
            {
                path: PATH.admin,
                element: <Admin />
            },
            {
                path: PATH.dashboard,
                element: <DashBoard />
            },
            {
                path: `${PATH.editNguoiDung}/:taiKhoan`,
                element: <EditNguoidung />
            },
            {
                path: PATH.films,
                element: <Films />
            },
            {
                path: PATH.addFilms,
                element: <AddFilms />
            },
            {
                path: `${PATH.editfilm}/:maPhim`,
                element: <EditFilm />
            },
            {
                path: `${PATH.showtime}`,
                element: <Showtime />,
                children: [
                    {
                        path:`${PATH.showtime}/:maPhim`
                    }
                ]
            }
        ]
    }
    
]

export const Router = () => useRoutes(router)