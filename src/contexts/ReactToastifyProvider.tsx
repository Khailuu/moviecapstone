import React, { Fragment } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
type Props = {
    children : React.ReactNode
}

export const ReactToastifyProvider = ({children}: Props) => {
  return (
    <Fragment>
        <ToastContainer/>
        {children}
    </Fragment>
  )
}
