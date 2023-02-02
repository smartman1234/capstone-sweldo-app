import { useEffect } from 'react'
import { useState } from 'react'
import AttendanceOverview from '../../components/admin/dashboard/AttendanceOverview'
import PageTitle from '../../components/ui/titles/PageTitle'
import UserStatistics from '../../components/user/UserStatistics'
import * as RestApi from '../../utils/rest_api_util'

const UserDashboard = () => {
  const [stats, setStats] = useState({
    monthly: 0,
    rate: 0,
    leave: 0,
    expectedSalary: 0,
    clockIn: null,
    clockOut: null
  })

  useEffect(() => {
    getDashboardStats()
  }, [])

  const getDashboardStats = async () => {
    try {
      const result = await RestApi.getDashboardStats()
      const response = await result.json()
      if (result.status === 200) {
        setStats(response)
      }
    } catch (error) {}
  }

  return (
    <div>
      <PageTitle title='Dashboard' />
      <UserStatistics
        monthly={stats.monthly}
        rate={stats.rate}
        leave={stats.leave}
        expectedSalary={stats.expectedSalary}
      />
      <AttendanceOverview getDashboardStats={getDashboardStats} clockIn={stats.clockIn} clockOut={stats.clockOut} />
    </div>
  )
}

export default UserDashboard
