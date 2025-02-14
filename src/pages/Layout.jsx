import React from 'react'
import { Outlet } from 'react-router-dom'
import MainSide from '../components/mainSide/MainSide';

function Layout() {
  return (
        <div className='flex w-full'>
        <MainSide/>
        <Outlet />
      
    </div>
    
  )
}

export default Layout;