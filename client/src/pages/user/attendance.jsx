import React, { useEffect, useState } from 'react'
import AdminAttendanceTable from '../../components/admin/attendance/AdminAttendanceTable'
import Pagination from '../../components/Pagination'
import CustomInput from '../../components/ui/inputs/CustomInput'
import PageTitle from '../../components/ui/titles/PageTitle'
import AttendanceTable from '../../components/user/attendance/AttendanceTable'
import * as RestApi from '../../utils/rest_api_util'

const Attendance = () => {
  const [formData, setFormData] = useState({
    name: '',
  })
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
      <div className='space-y-4'>
        <AttendanceTable attendances={attendances} />
        <Pagination pagination={attendances} onClick={getAttendances} />
      </div>
    </div>
  )
}

export default Attendance
