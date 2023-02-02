import { useEffect } from 'react'
import { useState } from 'react'
import AttendanceOverview from '../../components/admin/dashboard/AttendanceOverview'
import PageTitle from '../../components/ui/titles/PageTitle'
import StatisticCard from '../../components/ui/cards/StatisticCard'
import * as RestApi from '../../utils/rest_api_util'

const UserDashboard = () => {
  const [stats, setStats] = useState({
    monthly: 0,
    rate: 0,
    leave: 0,
    expectedSalary: 0,
    clockIn: null,
    clockOut: null,
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
      <div className='space-y-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          <StatisticCard name='Monthly' value={stats.monthly} />
          <StatisticCard name='Rate' value={stats.rate} />
          <StatisticCard name='Leave' value={stats.leave} />
          <StatisticCard name='Expected Salary' value={stats.expectedSalary} />
        </div>
        <AttendanceOverview
          getDashboardStats={getDashboardStats}
          clockIn={stats.clockIn}
          clockOut={stats.clockOut}
        />
      </div>
    </div>
  )
}

export default UserDashboard
