import { useEffect } from 'react'
import { useState } from 'react'
import RecentAttendance from '../../components/admin/dashboard/RecentAttendance'
import StatisticCard from '../../components/ui/cards/StatisticCard'
import PageTitle from '../../components/ui/titles/PageTitle'
import * as RestApi from '../../utils/rest_api_util'

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalEmployee: 0,
    totalPresent: 0,
    totalLate: 0,
    totalOnLeave: 0,
  })

  const [recentAttendances, setRecentAttendances] = useState()

  useEffect(() => {
    getAdminDashboard()
    getRecentAttendance()
  }, [])

  const getAdminDashboard = async () => {
    try {
      const result = await RestApi.getAdminDashboardStats()
      const response = await result.json()
      if (result.status === 200) {
        setStats(response)
      }
    } catch (error) {}
  }

  const getRecentAttendance = async () => {
    try {
      const result = await RestApi.getRecentAttendance()
      const response = await result.json()
      if (result.status === 200) {
        setRecentAttendances(response.attendance)
      }
    } catch (error) {}
  }

  return (
    <div>
      <PageTitle title='Dashboard' />
      <div className='space-y-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          <StatisticCard name='Total Employee' value={stats.totalEmployee} />
          <StatisticCard name='Present' value={stats.totalPresent} />
          <StatisticCard name='Late' value={stats.totalLate} />
          <StatisticCard name='On Leave' value={stats.totalOnLeave} />
        </div>
        <RecentAttendance recentAttendances={recentAttendances} />
      </div>
    </div>
  )
}

export default AdminDashboard
