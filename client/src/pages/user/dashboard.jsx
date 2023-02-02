import { useEffect } from 'react'
import { useState } from 'react'
import AttendanceOverview from '../../components/admin/dashboard/AttendanceOverview'
import UserStatistics from '../../components/user/UserStatistics'
import * as RestApi from '../../utils/rest_api_util'

const UserDashboard = () => {
  const [isClockIn, setIsClockIn] = useState()
  const [stats, setStats] = useState({
    monthly: 0,
    rate: 0,
    leave: 0,
    expectedSalary: 0,
  })

  useEffect(() => {
    getDashboardStats()
  }, [])

  const getDashboardStats = async () => {
    try {
      const result = await RestApi.getDashboardStats()
      const response = await result.json()
      if (result.status === 200) {
        setIsClockIn(response.isClockIn)
        setStats(response)
      }
    } catch (error) {}
  }

  return (
    <div className=''>
      <UserStatistics
        monthly={stats.monthly}
        rate={stats.rate}
        leave={stats.leave}
        expectedSalary={stats.expectedSalary}
      />
      <AttendanceOverview isClockIn={isClockIn}/>
    </div>
  )
}

export default UserDashboard
