import { useEffect, useState } from 'react'
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
import { toast } from 'react-toastify'

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

const AttendanceOverview = ({ clock, setClock }) => {
  const [loading, setLoading] = useState(false)

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
        setClock(2)
        toast.success(response.message)
      }
      if (result.status === 400) {
        toast.error(response.message)
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
        setClock(3)
        toast.success(response.message)
      }
      if (result.status === 400) {
        toast.error(response.message)
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
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
          ],
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
            {clock === 0 && (
              <CustomButton name='Loading' onClick={() => {}} loading={true} />
            )}
            {clock === 1 && (
              <CustomButton name='Clock In' onClick={handleClockIn} loading={loading} />
            )}
            {clock === 2 && (
              <CustomButton name='Clock Out' onClick={handleClockOut} loading={loading} />
            )}
            {clock === 3 && (
              <CustomButton name='Not available' onClick={() => {}} disabled={true} />
            )}
          </div>
        </div>
      </div>
      <div className='h-96'>
        <Bar options={options} data={chartData} />
      </div>
    </div>
  )
}

export default AttendanceOverview
