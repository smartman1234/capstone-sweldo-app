import SidebarButton from './ui/buttons/SidebarButton'

const Sidebar = ({ activeSidebar, toggleSidebar }) => {
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
            <p className='p-5 text-center bg-black text-white rounded'>
              Welcome, User
            </p>
          </li>
          <li className='flex'>
            <SidebarButton name='Dashboard' to='/admin/dashboard' />
          </li>
          <li className='flex'>
            <SidebarButton name='Employee' to='/admin/employee' />
          </li>
          <li className='flex'>
            <SidebarButton name='Department' to='/admin/department' />
          </li>
          <li className='flex'>
            <SidebarButton name='Job' to='/admin/job' />
          </li>
          <li className='flex'>
            <SidebarButton name='Leave' to='/admin/leave' />
          </li>
          <li className='flex'>
            <SidebarButton name='Payroll' to='/admin/payroll' />
          </li>
          <li className='flextext-white'>
            <button
              className='w-full flex space-x-5 text-black font-medium px-5 py-2.5 rounded hover:bg-blue-600 hover:text-white'
              onClick={() => {}}
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
