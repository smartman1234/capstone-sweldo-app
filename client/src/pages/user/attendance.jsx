import React, { useEffect, useState } from 'react'
import Pagination from '../../components/Pagination'
import PageTitle from '../../components/ui/titles/PageTitle'
import AttendanceTable from '../../components/user/attendance/AttendanceTable'
import * as RestApi from '../../utils/rest_api_util'

const Attendance = () => {
  const [attendances, setAttendances] = useState()

  useEffect(() => {
    getAttendances()
  }, [])

  const getAttendances = async (page = 1) => {
    try {
      const result = await RestApi.getAttendances(page)
      const response = await result.json()
      if (result.status === 200) {
        setAttendances(response.attendances)
      }
    } catch (error) {}
  }

  return (
    <div>
      <PageTitle title='Attendance' />
      <div className='space-y-4 bg-white p-5 rounded-lg drop-shadow-xl'>
        <AttendanceTable attendances={attendances} />
        <Pagination pagination={attendances} onClick={getAttendances} />
      </div>
    </div>
  )
}

export default Attendance
