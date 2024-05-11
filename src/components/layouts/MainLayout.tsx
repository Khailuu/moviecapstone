import { HomeMenu } from 'components/ui/home'
import { Outlet } from 'react-router-dom'
import { Footer, Header, HomeCarousel } from 'ui'

export const MainLayout = () => {
  return (
    <main className='main min-h-screen' style={{ backgroundColor: '#25293a'}}>
        <Header />
        <div className='mb-[80px]'>
        <HomeCarousel />
        </div>
        <div className='mx-auto container'>
          <Outlet />
          <div className='container mx-auto mt-7 mb-7' style={{maxWidth: 1024}}><HomeMenu /></div>
        </div>
        <Footer />
    </main>
  )
}
