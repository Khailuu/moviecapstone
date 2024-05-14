import { AuthLayout, MainLayout } from 'layouts'
import { PATH } from 'constant'
import { DatVe, Home, Login, Register } from 'pages'
import { RouteObject, useRoutes } from 'react-router-dom'



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
                path: PATH.datVe ,
                element:  <DatVe />
            }
        ]
    }
    
]

export const Router = () => useRoutes(router)