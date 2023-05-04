import React from 'react'
import {Outlet} from "react-router-dom"
import Header from "../components/Ui/Header"
import Footer from "../components/Ui/Footer"

function Layout() {
  return (
    <div className='flex flex-col h-screen'>
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Layout