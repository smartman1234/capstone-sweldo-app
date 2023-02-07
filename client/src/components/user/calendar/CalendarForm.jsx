import './CalendarForm.css'
import { useEffect, useState } from 'react'
import { Calendar } from 'react-calendar'
import TaskForm from './TaskForm'
import * as RestApi from '../../../utils/rest_api_util'

const CalendarForm = () => {
  const [month, setMonth] = useState(0)
  const [monthlyTasks, setMonthlyTasks] = useState([])

  // Task
  const [selectedDate, setSelectedDate] = useState()

  useEffect(() => {
    setMonth(new Date().getMonth())
    getMonthlyTasks(Date.parse(new Date()) / 1000)
  }, [])

  const getMonthlyTasks = async (date) => {
    try {
      const result = await RestApi.getMonthlyTasks(date)
      const response = await result.json()
      if (result.status === 200) {
        setMonthlyTasks(response.tasks)
      }
    } catch (error) {}
  }

  const onActiveStartDateChange = ({ activeStartDate }) => {
    setMonth(activeStartDate.getMonth())
    setMonthlyTasks([])
    getMonthlyTasks(Date.parse(activeStartDate) / 1000)
  }

  const onChange = (value) => {
    setSelectedDate(Date.parse(value) / 1000)
  }

  return (
    <div>
      <Calendar
        onActiveStartDateChange={onActiveStartDateChange}
        onChange={onChange}
        tileContent={({ date, view }) => {
          return view === 'month' &&
            month === date.getMonth() &&
            monthlyTasks[date.getDate()] !== undefined ? (
            <div className='mt-1 flex justify-center'>
              <div className='bg-blue-100 text-blue-800 text-xs font-medium p-1 rounded'>
                {monthlyTasks[date.getDate()]} task(s)
              </div>
            </div>
          ) : null
        }}
      />
      {selectedDate && (
        <TaskForm
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          getMonthlyTasks={getMonthlyTasks}
        />
      )}
    </div>
  )
}

export default CalendarForm
