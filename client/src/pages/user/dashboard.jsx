import { useEffect } from 'react'
import { useState } from 'react'
import AttendanceOverview from '../../components/admin/dashboard/AttendanceOverview'
import Statistics from '../../components/admin/dashboard/Statistics'
import * as RestApi from '../../utils/rest_api_util'

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    monthly: 0,
    rate: 0,
    leave: 0,
    expectedSalary: 0,
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
        monthly={stats.monthly}
        rate={stats.rate}
        leave={stats.leave}
        expectedSalary={stats.expectedSalary}
      />
      <AttendanceOverview />
    </div>
  )
}

export default AdminDashboard
