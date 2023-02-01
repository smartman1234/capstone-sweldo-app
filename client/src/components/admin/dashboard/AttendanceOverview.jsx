import { useState } from 'react'
import CustomButton from '../../ui/buttons/CustomButton'

const AttendanceOverview = () => {
  const [toggle, setToggle] = useState(false)

  const toggleButton = async () => {
    setToggle(!toggle)
  }
  return (
    <div className='h-96 bg-slate-200 m-5 p-5'>
      <div className='flex justify-between'>
        <h1 className='font-bold'>Attendance Overview</h1>
        {toggle ? (
          <CustomButton name='Clock Out' onClick={toggleButton} />
        ) : (
          <CustomButton name='Clock In' onClick={toggleButton} />
        )}
      </div>
    </div>
  )
}

export default AttendanceOverview
