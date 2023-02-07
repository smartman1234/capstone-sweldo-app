import React, { useState } from 'react'
import CustomInput from '../../components/ui/inputs/CustomInput'
import PageTitle from '../../components/ui/titles/PageTitle'
import * as RestApi from '../../utils/rest_api_util'

const AdminAttendance = () => {
  const [formData, setFormData] = useState({
    name: '',
  })
  const [attendances, setAttendances] = useState()

  const searchEmployee = async (name, page = 1) => {
    try {
      const result = await RestApi.searchAttendances(name, page)
      const response = await result.json()
      if (result.status === 200) {
        setAttendances(response.attendance)
      }
    } catch (error) {}
  }
  return (
    <div>

    <PageTitle title='Attendance'/>
    <div className='space-y-4'>
        <div className='flex space-x-4'>
          <CustomInput
            id='name'
            type='text'
            placeholder='Search for employee name'
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value })
              searchEmployee(e.target.value)
            }}
          />
          </div>
    <table className='w-full text-left'>
      <thead className='bg-gray-100 uppercase'>
        <tr>
          <th className='p-2.5'>#</th>
          <th className='p-2.5'>Name</th>
          <th className='p-2.5'>Clock In</th>
          <th className='p-2.5'>Clock Out</th>
          <th className='p-2.5'>Date</th>
          <th className='p-2.5'>Status</th>
        </tr>
      </thead>
      <tbody>
        {attendances !== undefined &&
          (attendances.length !== 0 ? (
            attendances.map((attendance, index) => (
              <tr key={index} className='border-b'>
                <th className='p-2.5'>{index + 1}</th>
                <td className='p-2.5'>{attendance.name}</td>
                <td className='p-2.5'>{attendance.clock_in}</td>
                <td className='p-2.5'>{attendance.clock_out}</td>
                <td className='p-2.5'>
                  {new Date(attendance.clock_in).toLocaleDateString('default', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </td>
                <td className='p-2.5'>
                  {attendance.status === 'present' && (
                    <span className='bg-green-500 text-white text-sm capitalize rounded px-2 py-1'>
                      {attendance.status}
                    </span>
                  )}
                  {attendance.status === 'late' && (
                    <span className='bg-red-500 text-white text-sm capitalize rounded px-2 py-1'>
                      {attendance.status}
                    </span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='5' className='text-center p-2.5'>
                No leave available
              </td>
            </tr>
          ))}
      </tbody>
    </table>
    </div>
    </div>
  )
}

export default AdminAttendance