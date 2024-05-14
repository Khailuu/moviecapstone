import { Outlet } from 'react-router-dom'
import { Footer, Header } from 'ui'
// import { useSelector } from "react-redux"
// import { Navigate } from "react-router-dom"
// import { RootState } from "store"

export const MainLayout = () => {
  // const { userLogin } = useSelector((state: RootState) => state.quanLyNguoiDung)
  //   if(!userLogin) {
  //       return <Navigate to='/login' />
  //   }
  return (
    <main className='main min-h-screen flex flex-col' style={{ backgroundColor: '#25293a'}}>
        <Header />
        <div className='flex-1'>
        <Outlet />
        </div>
        <Footer />
    </main>
  )
}
