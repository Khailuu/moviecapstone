import { AuthLayout } from 'layouts'
import { PATH } from 'constant'
import { Login, Register } from 'pages'
import { RouteObject, useRoutes } from 'react-router-dom'
import { HomeLayput } from 'components/layouts/HomeLayput'



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
        ]
    },
    {
        element: <HomeLayput />,
        path: PATH.home
    }
    
]

export const Router = () => useRoutes(router)