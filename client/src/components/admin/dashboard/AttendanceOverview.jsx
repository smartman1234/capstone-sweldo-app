import { useState } from 'react'
import CustomButton from '../../ui/buttons/CustomButton'
import * as RestApi from '../../../utils/rest_api_util'

const AttendanceOverview = ({ getDashboardStats, clockIn, clockOut }) => {
  const [loading, setLoading] = useState(false)

  const handleClockIn = async () => {
    setLoading(true)
    try {
      const result = await RestApi.clockIn()
      const response = await result.json()
      if (result.status === 200) {
        // TODO: Toast
        getDashboardStats()
      }
      if (result.status === 400) {
        // TODO: Toast
      }
    } catch (error) {}
    setLoading(false)
  }

  const handleClockOut = async () => {
    setLoading(true)
    try {
      const result = await RestApi.clockOut()
      const response = await result.json()
      if (result.status === 200) {
        // TODO: Toast
        getDashboardStats()
      }
      if (result.status === 400) {
        // TODO: Toast
      }
    } catch (error) {}
    setLoading(false)
  }

  return (
    <div className='bg-slate-200 p-5'>
      <div className='flex justify-between'>
        <h1 className='font-bold'>Attendance Overview</h1>
        <div>
          {clockIn ? (
            clockOut ? null : (
              <CustomButton
                name='Clock Out'
                onClick={handleClockOut}
                loading={loading}
              />
            )
          ) : (
            <CustomButton
              name='Clock In'
              onClick={handleClockIn}
              loading={loading}
            />
          )}
        </div>
      </div>
      <div className='bg-red-500'>Chart here</div>
    </div>
  )
}

export default AttendanceOverview
