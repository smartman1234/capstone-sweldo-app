import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SidebarButton from './ui/buttons/SidebarButton'

const Sidebar = ({ activeSidebar, toggleSidebar }) => {
  const navigate = useNavigate()

  const [admin, setAdmin] = useState(false)
  const fullName = localStorage.getItem('first_name') + ' ' + localStorage.getItem('last_name');


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

  return (
    <aside
      className={
        activeSidebar
          ? 'bg-[#22223b] fixed z-10 w-full md:w-64 h-screen transition-all duration-300 overflow-auto pb-5'
          : 'bg-[#22223b] fixed z-10 w-64 h-screen transition-all duration-300 -ml-64'
      }
    >
      {/* Toggle */}
      <div className='h-16 flex items-center px-5'>
        <button
          className='block md:hidden bg-[#4a4e69] text-white font-medium p-2 rounded hover:bg-[#4a4e69]/50'
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
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>
      </div>
      {/* Menu */}
      <nav className='navigation'>
        <ul className='flex flex-col space-y-4'>
          <li>
            <div className='flex flex-col justify-center items-center py-4 space-y-2'>
              {localStorage.getItem('avatar') === 'null' ? (
                <div className='w-20 h-20 flex justify-center items-center rounded-full bg-gray-500'>
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
                      d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
                    />
                  </svg>
                </div>
              ) : (
                <img
                  src={localStorage.getItem('avatar')}
                  alt='Avatar'
                  className='w-20 h-20 rounded-full'
                />
              )}
              <p className='text-center text-white rounded'>
                 {fullName}
              </p>

            </div>
          </li>
          {admin === false ? (
            <>
              <li className='flex'>
                <SidebarButton name='Dashboard' to='dashboard' />
              </li>
              <li className='flex'>
                <SidebarButton name='Attendance' to='attendance' />
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
                <SidebarButton name='Attendance' to='attendance' />
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
          <li className='flextext-white pl-5'>
            <button
              className='w-full flex space-x-4 text-white font-medium px-5 py-2.5 rounded'
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
