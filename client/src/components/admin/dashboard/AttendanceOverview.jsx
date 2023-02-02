import { useState } from 'react'
import CustomButton from '../../ui/buttons/CustomButton'
import * as RestApi from '../../../utils/rest_api_util'
import SuccessAlert from '../../ui/alerts/SuccessAlert'
import DangerAlert from '../../ui/alerts/DangerAlert'

const AttendanceOverview = ({ isClockIn }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [success, setSuccess] = useState()

  const clockIn = async () => {
    setLoading(true)
    setError(undefined)
    setSuccess(undefined)
    try {
      const result = await RestApi.clockIn()
      const response = await result.json()
      if (result.status === 200) {
        setSuccess(response)
      }

      if (result.status === 400) {
        setError(response)
      }
    } catch (error) {}
    setLoading(false)
  }
  const clockOut = async () => {
    try {
      const result = await RestApi.clockOut()
      const response = await result.json()
      if (result.status === 200) {
        setSuccess(response)
      }

      if (result.status === 400) {
        setError(response)
      }
    } catch (error) {}
    setLoading(false)
  }
  return (
    <div className='h-96 bg-slate-200 m-5 p-5'>
      <div className='flex justify-between'>
        <h1 className='font-bold'>Attendance Overview</h1>
        {isClockIn ? (
          <div>
            <CustomButton name='Clock Out' onClick={clockOut} loading={loading} />
            <SuccessAlert message={success?.message} />
          </div>
        ) : (
          <div>
            <CustomButton name='Clock In' onClick={clockIn} loading={loading} />
            <SuccessAlert message={success?.message} />
            <DangerAlert message={error?.message} />
          </div>
        )}
      </div>
    </div>
  )
}

export default AttendanceOverview
