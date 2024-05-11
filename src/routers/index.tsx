import { AuthLayout, MainLayout } from 'layouts'
import { PATH } from 'constant'
import { Home, Login, Register } from 'pages'
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
                element: <Home />
            }
        ]
    }
    
]

export const Router = () => useRoutes(router)