import { useState } from 'react'
import CustomButton from '../../ui/buttons/CustomButton'
import * as RestApi from '../../../utils/rest_api_util'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { useEffect } from 'react'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
  },
}

const AttendanceOverview = ({ getDashboardStats, clockIn, clockOut }) => {
  const [loading, setLoading] = useState(false)

  const [attendanceFilter, setAttendanceFilter] = useState('weekly')
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  })

  useEffect(() => {
    getAttendanceOverview()
  }, [])

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

  const getAttendanceOverview = async () => {
    try {
      const result = await RestApi.getAttendanceOverview()
      const response = await result.json()
      if (result.status === 200) {
        setChartData({
          ...chartData,
          labels: response.previousAttendances.labels.reverse(),
          datasets: [
            {
              label: 'Work Hours',
              data: response.previousAttendances.data.reverse(),
              backgroundColor: 'rgba(53, 162, 235, 0.5)'
            }
          ]
        })
      }
    } catch (error) {}
  }

  return (
    <div className='bg-white shadow p-5'>
      <div className='space-y-4'>
        <div className='flex justify-between'>
          <h1 className='text-2xl font-bold'>Online Attendance</h1>
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
        {/* <div className='flex justify-between items-center'>
          <div>
            <h1>⏱ Tracked Time</h1>
            <span className='text-3xl font-bold'>7h 30m</span>
          </div>
          <div>
            <select
              className='w-full text-gray px-5 py-2.5 rounded border'
              id='filter'
              value={attendanceFilter}
              onChange={(e) => setAttendanceFilter(e.target.value)}
            >
              <option value='weekly'>Weekly</option>
              <option value='monthly'>Monthly</option>
              <option value='yearly'>Yearly</option>
            </select>
          </div>
        </div> */}
      </div>
      <div className='h-96'>
        <Bar options={options} data={chartData} />
      </div>
    </div>
  )
}

export default AttendanceOverview
