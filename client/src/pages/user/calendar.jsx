import { useState } from 'react'
import PageTitle from '../../components/ui/titles/PageTitle'
import CalendarForm from '../../components/user/calendar/CalendarForm'
import TaskForm from '../../components/user/calendar/TaskForm'

const Calendar = () => {

  // Task
  const [selectedDate, setSelectedDate] = useState()

  return (
    <div>
      <PageTitle title='Calendar' />
      <CalendarForm setSelectedDate={setSelectedDate} />
      {selectedDate && <TaskForm selectedDate={selectedDate} setSelectedDate={setSelectedDate} />}
    </div>
  )
}

export default Calendar
