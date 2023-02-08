const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className='bg-[#03C988] sticky top-0 h-16 flex justify-between items-center px-5'>
      <button
        className='bg-blue-600 text-white font-medium p-2 rounded hover:bg-blue-500'
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
    </nav>
  )
}

export default Navbar
