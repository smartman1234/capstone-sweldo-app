import { useEffect } from 'react'
import { useState } from 'react'
import AttendanceOverview from '../../components/admin/dashboard/AttendanceOverview'
import UserStatistics from '../../components/user/UserStatistics'
import * as RestApi from '../../utils/rest_api_util'

const UserDashboard = () => {
  const [stats, setStats] = useState({
    monthly: 0,
    rate: 0,
    leave: 0,
    expectedSalary: 0,
  })

  useEffect(() => {
    getUserDashboard()
  }, [])

  const getUserDashboard = async () => {
    try {
      const result = await RestApi.getUserDashboardStats()
      const response = await result.json()
      if (result.status === 200) {
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
      <AttendanceOverview />
    </div>
  )
}

export default UserDashboard
