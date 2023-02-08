import React, { useEffect, useState } from 'react'
import AdminAttendanceTable from '../../components/admin/attendance/AdminAttendanceTable'
import Pagination from '../../components/Pagination'
import CustomInput from '../../components/ui/inputs/CustomInput'
import PageTitle from '../../components/ui/titles/PageTitle'
import * as RestApi from '../../utils/rest_api_util'

const AdminAttendance = () => {
  const [formData, setFormData] = useState({
    name: '',
  })
  const [attendances, setAttendances] = useState()

  useEffect(() => {
    getAdminAttendances()
  }, [])

  const getAdminAttendances = async (page = 1) => {
    if (formData.name !== '') {
      searchAttendances(formData.name, page)
      return
    }
    try {
      const result = await RestApi.getAdminAttendances(page)
      const response = await result.json()
      if (result.status === 200) {
        setAttendances(response.attendances)
      }
    } catch (error) {}
  }

  const searchAttendances = async (name, page = 1) => {
    try {
      const result = await RestApi.searchAttendances(name, page)
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
        <div className='flex'>
          <CustomInput
            id='name'
            type='text'
            placeholder='Search for employee name'
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value })
              searchAttendances(e.target.value)
            }}
          />
        </div>
        <AdminAttendanceTable attendances={attendances} />
        <Pagination pagination={attendances} onClick={getAdminAttendances} />
      </div>
    </div>
  )
}

export default AdminAttendance
