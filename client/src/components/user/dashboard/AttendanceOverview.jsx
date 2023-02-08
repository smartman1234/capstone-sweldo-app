import { useEffect, useState } from 'react'
import CustomButton from '../../ui/buttons/CustomButton'
import DangerButton from '../../ui/buttons/DangerButton'
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
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  )
  const [loading, setLoading] = useState(false)

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  })

  useEffect(() => {
    setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString())
    }, 1000)
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

  const getAttendanceOverview = async (filter = 'daily') => {
    try {
      const result = await RestApi.getAttendanceOverview(filter)
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
    <div className='bg-white p-5 rounded-lg drop-shadow-xl'>
      <div className='space-y-4'>
        <div className='flex justify-between'>
          <h1 className='text-2xl font-bold'>Online Attendance</h1>
          <div>
            {clock === 0 && (
              <CustomButton name='Loading' onClick={() => {}} loading={true} />
            )}
            {clock === 1 && (
              <CustomButton
                name={`Clock - In (${currentTime})`}
                onClick={handleClockIn}
                loading={loading}
              />
            )}
            {clock === 2 && (
              <DangerButton
                name={`Clock - Out (${currentTime})`}
                onClick={handleClockOut}
                loading={loading}
              />
            )}
            {clock === 3 && (
              <CustomButton
                name='Not available'
                onClick={() => {}}
                disabled={true}
              />
            )}
          </div>
        </div>
        <div className='flex justify-end'>
          <div>
            <select
              className='w-full text-gray px-5 py-2.5 rounded border'
              id='filter'
              onChange={(e) => getAttendanceOverview(e.target.value)}
            >
              <option value='daily'>Daily</option>
              <option value='weekly'>Weekly</option>
              <option value='monthly'>Monthly</option>
            </select>
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
