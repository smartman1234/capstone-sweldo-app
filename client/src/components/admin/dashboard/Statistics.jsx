import React from 'react'

const Statistics = () => {
  return (
    <div className='bg-slate-200 m-5 p-5'>
      <h1 className='font-bold mb-5'>Statistics</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
        <div className='bg-slate-500 h-24 p-3'>
          <h2 className='mb-4'>Total Employees</h2>
          <h2 className='flex justify-center text-2xl'>20</h2>
        </div>
        <div className='bg-slate-500 h-24 p-3'>
          <h2 className='mb-4'>Present</h2>
          <h2 className='flex justify-center text-2xl'>16/20</h2>
        </div>
        <div className='bg-slate-500 h-24 p-3'>
          <h2 className='mb-4'>Late</h2>
          <h2 className='flex justify-center text-2xl'>3/20</h2>
        </div>
        <div className='bg-slate-500 h-24 p-3'>
          <h2 className='mb-4'>On Leave</h2>
          <h2 className='flex justify-center text-2xl'>1/20</h2>
        </div>
      </div>
    </div>
  )
}

export default Statistics
