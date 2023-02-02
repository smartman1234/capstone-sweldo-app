import React from 'react'

const UserStatistics = ({ monthly, rate, leave, expectedSalary }) => {
  return (
    <div>
      <div className='bg-slate-200 m-5 p-5'>
        <h1 className='font-bold mb-5'>Statistics</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
          <div className='bg-slate-500 h-24 p-3'>
            <h2 className='mb-4'>Monthly</h2>
            <h2 className='flex justify-center text-2xl'>{monthly}</h2>
          </div>
          <div className='bg-slate-500 h-24 p-3'>
            <h2 className='mb-4'>Rate</h2>
            <h2 className='flex justify-center text-2xl'>{rate}</h2>
          </div>
          <div className='bg-slate-500 h-24 p-3'>
            <h2 className='mb-4'>Leave</h2>
            <h2 className='flex justify-center text-2xl'>{leave}</h2>
          </div>
          <div className='bg-slate-500 h-24 p-3'>
            <h2 className='mb-4'>ExpectedSalary</h2>
            <h2 className='flex justify-center text-2xl'>{expectedSalary}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserStatistics
