import { useEffect } from 'react'
import { useState } from 'react'
import AttendanceOverview from '../../components/admin/dashboard/AttendanceOverview'
import Statistics from '../../components/admin/dashboard/Statistics'
import * as RestApi from '../../utils/rest_api_util'

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalEmployee: 0,
    totalPresent: 0,
    totalLate: 0,
    totalOnLeave: 0,
  })

  useEffect(() => {
    getAdminDashboard()
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

  return (
    <div className=''>
      <Statistics
        totalEmployee={stats.totalEmployee}
        totalPresent={stats.totalPresent}
        totalLate={stats.totalLate}
        totalOnLeave={stats.totalOnLeave}
      />
      <AttendanceOverview />
    </div>
  )
}

export default AdminDashboard
