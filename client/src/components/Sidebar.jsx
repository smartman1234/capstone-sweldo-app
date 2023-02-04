import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SidebarButton from './ui/buttons/SidebarButton'
import * as RestApi from '../utils/rest_api_util'

const Sidebar = ({ activeSidebar, toggleSidebar }) => {
  const navigate = useNavigate()

  const [admin, setAdmin] = useState(false)
  const [username, setUsername] = useState({ first_name: '' })
  useEffect(() => {
    getProfile()
  }, [])
  useEffect(() => {
    const isAdmin = localStorage.getItem('is_admin')
    if (isAdmin === '1') {
      setAdmin(true)
    }
  }, [])


  const logout = () => {
    localStorage.clear()
    navigate('/')
  }
  const getProfile = async () => {
    try {
      const result = await RestApi.getProfile()
      const response = await result.json()
      if (result.status === 200) {
        setUsername(response.user)
      }
    } catch (error) { }
  }

  return (
    <aside
      className={
        activeSidebar
          ? 'bg-blue-500 fixed z-10 w-full md:w-64 h-screen transition-all duration-300'
          : 'bg-white fixed z-10 w-64 h-screen transition-all duration-300 -ml-64'
      }
    >
      {/* Toggle */}
      <div className='bg-blue-700 h-16 flex items-center px-5'>
        <button
          className='block md:hidden bg-blue-600 text-white font-medium p-2 rounded hover:bg-blue-500'
          onClick={toggleSidebar}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12'
            />
          </svg>
        </button>
      </div>
      {/* Menu */}
      <nav>
        <ul className='flex flex-col space-y-4 p-5'>
          <li>
            <div className="flex justify-center">
              <img className='bg-black rounded-full  h-24 w-24' src='#' alt='images' />
            </div>
          </li>
          <li>
            <p className='p-5 text-center bg-black text-white rounded'>
              Welcome, {username.first_name}
            </p>
          </li>
          {admin === false ? (
            <>
              <li className='flex'>
                <SidebarButton name='Dashboard' to='dashboard' />
              </li>
              <li className='flex'>
                <SidebarButton name='Calendar' to='calendar' />
              </li>
              <li className='flex'>
                <SidebarButton name='Leave' to='leave' />
              </li>
              <li className='flex'>
                <SidebarButton name='Salary History' to='salary-history' />
              </li>
              <li className='flex'>
                <SidebarButton name='Profile' to='profile' />
              </li>
              <li className='flex'>
                <SidebarButton name='Settings' to='settings' />
              </li>
            </>
          ) : (
            <>
              <li className='flex'>
                <SidebarButton name='Dashboard' to='dashboard' />
              </li>
              <li className='flex'>
                <SidebarButton name='Employee' to='employee' />
              </li>
              <li className='flex'>
                <SidebarButton name='Department' to='department' />
              </li>
              <li className='flex'>
                <SidebarButton name='Job' to='job' />
              </li>
              <li className='flex'>
                <SidebarButton name='Deduction' to='deduction' />
              </li>
              <li className='flex'>
                <SidebarButton name='Leave' to='leave' />
              </li>
              <li className='flex'>
                <SidebarButton name='Payroll' to='payroll' />
              </li>
              <li className='flex'>
                <SidebarButton name='Profile' to='profile' />
              </li>
              <li className='flex'>
                <SidebarButton name='Settings' to='settings' />
              </li>
            </>
          )}
          <li className='flextext-white'>
            <button
              className='w-full flex space-x-4 text-black font-medium px-5 py-2.5 rounded hover:bg-blue-600 hover:text-white'
              onClick={logout}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75'
                />
              </svg>
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
