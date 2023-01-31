import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'

const Layout = () => {
  const [activeSidebar, setActiveSidebar] = useState(true)

  const toggleSidebar = () => {
    setActiveSidebar(!activeSidebar)
  }

  return (
    <div className='flex overflow-x-hidden'>
      <Sidebar activeSidebar={activeSidebar} toggleSidebar={toggleSidebar} />
      <div
        className={
          activeSidebar
            ? 'w-full transition-all duration-300 ml-64'
            : 'w-full transition-all duration-300'
        }
      >
        <Navbar
          activeSidebar={activeSidebar}
          toggleSidebar={toggleSidebar}
        />
        <div className='p-5'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
