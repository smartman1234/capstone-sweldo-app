import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'

const AdminLayout = () => {
  const navigate = useNavigate()

  const [activeSidebar, setActiveSidebar] = useState(true)

  useEffect(() => {
    const isAdmin = localStorage.getItem('is_admin')
    const token = localStorage.getItem('token')
    if (!token || !isAdmin) {
      navigate('/')
      return
    }
    if (isAdmin === '0') {
      navigate('/dashboard')
      return
    }
    // eslint-disable-next-line
  }, [])

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
        <Navbar activeSidebar={activeSidebar} toggleSidebar={toggleSidebar} />
        <div className='p-5'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
