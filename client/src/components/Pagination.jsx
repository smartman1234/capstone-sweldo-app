const Pagination = ({ pagination, onClick }) => {
  return (
    <ul className='flex flex-wrap gap-2'>
      {pagination !== undefined &&
        pagination.data.length !== 0 &&
        pagination.links.map((link, key) => {
          if (key === 0) {
            return (
              <li key={key}>
                <button
                  className={
                    link.url !== null
                      ? 'font-medium p-2.5 rounded'
                      : 'text-slate-500 font-medium p-2.5 rounded'
                  }
                  onClick={() => onClick(pagination.current_page - 1)}
                  disabled={link.url === null}
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
                      d='M15.75 19.5L8.25 12l7.5-7.5'
                    />
                  </svg>
                </button>
              </li>
            )
          }
          if (key === pagination.links.length - 1) {
            return (
              <li key={key}>
                <button
                  className={
                    link.url !== null
                      ? 'font-medium p-2.5 rounded'
                      : 'text-slate-500 font-medium p-2.5 rounded'
                  }
                  onClick={() => onClick(pagination.current_page + 1)}
                  disabled={link.url === null}
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
                      d='M8.25 4.5l7.5 7.5-7.5 7.5'
                    />
                  </svg>
                </button>
              </li>
            )
          }
          return (
            <li key={key}>
              <button
                className={
                  link.active
                    ? 'bg-[#22223b] text-white font-medium px-5 py-2.5 rounded'
                    : 'font-medium px-5 py-2.5 rounded hover:bg-[#22223b] hover:text-white'
                }
                onClick={() => onClick(link.label)}
                disabled={link.active}
              >
                {link.label}
              </button>
            </li>
          )
        })}
    </ul>
  )
}

export default Pagination
