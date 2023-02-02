import { useState } from 'react'
import CustomButton from '../../ui/buttons/CustomButton'
import * as RestApi from '../../../utils/rest_api_util'

const AttendanceOverview = ({ isClockIn }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [success, setSuccess] = useState()
  const [toggle, setToggle] = useState(false)

  const toggleButton = async () => {
    setToggle(!toggle)
  }

  const clockIn = async () => {
    try {
      const result = await RestApi.clockIn()
      const response = await result.json()
      if (result.status === 200) {
      }

      if (result.status === 400) {
      }
    } catch (error) {}
  }
  const clockOut = async () => {
    try {
      const result = await RestApi.clockOut()
      const response = await result.json()
      if (result.status === 200) {
      }

      if (result.status === 400) {
      }
    } catch (error) {}
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
