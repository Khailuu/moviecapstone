import React, { useState } from 'react'

type DemoComponentProps = {
    name?: String
    age?: number
    sum: () => void
    //sum(): void // function
    total(a:number, b:number): void
}

export const DemoComponent = (props: DemoComponentProps) => {

    const { name, age, sum, total } = props
    console.log("name: ", name)
    console.log("age: ", age)
    console.log("sum: ", sum)
    console.log("total: ", total)
    const [number, setNumber] = useState<number>()
  return (
    <div>
        <button className='py-10 px-20 ml-10 hover:bg-slate-500 transition ease-in-out duration-500 rounded-10 bg-slate-800 text-white' onClick={()=>setNumber(10)}>Total</button>
    </div>
  )
}
