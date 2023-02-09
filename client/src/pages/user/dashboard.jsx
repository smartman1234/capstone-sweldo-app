import { useEffect } from 'react'
import { useState } from 'react'
import AttendanceOverview from '../../components/user/dashboard/AttendanceOverview'
import PageTitle from '../../components/ui/titles/PageTitle'
import StatisticCard from '../../components/ui/cards/StatisticCard'
import * as RestApi from '../../utils/rest_api_util'

const UserDashboard = () => {
  const [stats, setStats] = useState({
    monthly: 0,
    rate: 0,
    leave: 0,
    expectedSalary: 0,
  })
  const [clock, setClock] = useState(0)

  useEffect(() => {
    getDashboardStats()
  }, [])

  const getDashboardStats = async () => {
    try {
      const result = await RestApi.getDashboardStats()
      const response = await result.json()
      if (result.status === 200) {
        setStats(response)
        if (response.clockIn === null && response.clockOut === null) {
          setClock(1)
        }
        if (response.clockIn !== null && response.clockOut === null) {
          setClock(2)
        }
        if (response.clockIn !== null && response.clockOut !== null) {
          setClock(3)
        }
      }
    } catch (error) {}
  }

  return (
    <div>
      <PageTitle title='Dashboard' />
      <div className='space-y-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          <StatisticCard
            name='Total Hours (Monthly)'
            svg={
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke-width='1.5'
                stroke='currentColor'
                class='w-6 h-6'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  d='M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            }
            value={stats.monthly}
          />
          <StatisticCard name='Rate per hour' value={stats.rate} />
          <StatisticCard name='Total Leave' value={stats.leave} />
          <StatisticCard name='Expected Salary' value={stats.expectedSalary} />
        </div>
        <AttendanceOverview clock={clock} setClock={setClock} />
      </div>
    </div>
  )
}

export default UserDashboard
