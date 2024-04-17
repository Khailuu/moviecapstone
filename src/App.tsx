import { DemoComponent } from './Components/DemoComponent'


function App() {

  return (
    <>
      <p className='[&>span]:text-red-300 text-9xl mt-10 text-lightGreen font-medium hover:text-red-900 transition-all ease-in-out duration-300'>Hello
        <span>KhaiLuu</span>
      </p>
    <DemoComponent /*name='123'*/ age={20} sum={()=>{
      console.log('hello')
    }} total={(a,b) => {
      console.log(a+b)
    }} />
    </>
  )
}

export default App
