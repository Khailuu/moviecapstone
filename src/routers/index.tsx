import { AdminLayout, AuthLayout, MainLayout } from 'layouts'
import { PATH } from 'constant'
import { Admin, DatVe, Home, Login, MovieDetail, Register } from 'pages'
import { RouteObject, useRoutes } from 'react-router-dom'
import { UserInfo } from 'pages/UserInfo'
import { DashBoard } from 'components/ui/admin/dashboard'
import { AddFilms, Films } from 'components/ui/admin/films'
import { Showtime } from 'components/ui/admin/showtime'



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
                path: `${PATH.datVe}/:maLichChieu`,
                element:  <DatVe />
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
                path: PATH.films,
                element: <Films />
            },
            {
                path: PATH.addFilms,
                element: <AddFilms />
            },
            {
                path: PATH.showtime,
                element: <Showtime />
            }
        ]
    }
    
]

export const Router = () => useRoutes(router)