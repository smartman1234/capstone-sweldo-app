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
          <StatisticCard
            name='Total Employee'
            value={stats.totalEmployee}
            svg={
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke-width='1.5'
                stroke='currentColor'
                class='h-full'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  d='M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z'
                />
              </svg>
            }
          />
          <StatisticCard
            name='Present'
            value={stats.totalPresent}
            svg={
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke-width='1.5'
                stroke='currentColor'
                class='h-full'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  d='M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z'
                />
              </svg>
            }
          />
          <StatisticCard
            name='Late'
            value={stats.totalLate}
            svg={
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke-width='1.5'
                stroke='currentColor'
                class='h-full'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  d='M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z'
                />
              </svg>
            }
          />
          <StatisticCard
            name='On Leave'
            value={stats.totalOnLeave}
            svg={
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='h-full'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75'
                />
              </svg>
            }
          />
        </div>
        <RecentAttendance recentAttendances={recentAttendances} />
      </div>
    </div>
  )
}

export default AdminDashboard
