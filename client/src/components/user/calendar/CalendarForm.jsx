import './CalendarForm.css'

import { Calendar } from 'react-calendar'

const CalendarForm = ({ setSelectedDate }) => {
  const onChange = (value) => {
    setSelectedDate(Date.parse(value) / 1000)
  }

  return <Calendar onChange={onChange} />
}

export default CalendarForm
