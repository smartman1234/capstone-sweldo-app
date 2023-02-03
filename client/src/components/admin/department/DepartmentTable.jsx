import { useEffect, useState } from 'react'
import ViewButton from '../../ui/buttons/ViewButton'
import * as RestApi from '../../../utils/rest_api_util'
import { toast } from 'react-toastify'
import DeleteButton from '../../ui/buttons/DeleteButton'

const DepartmentTable = ({ departments, setSelectedDepartmentId, getDepartments }) => {
  const handleSubmit = async (id) => {
    try {
      const result = await RestApi.deleteDepartment(id)
      const response = await result.json()
      if (result.status === 200) {
        getDepartments()
      }
      if (result.status === 400) {
        if (response.type === undefined) {
          toast.error(response.message)
        }
      }
    } catch (error) {}
  }

  return (
    <table className='w-full text-left'>
      <thead className='bg-gray-100 uppercase'>
        <tr>
          <th className='p-2.5'>#</th>
          <th className='p-2.5'>Name</th>
          <th className='p-2.5'>Action</th>
        </tr>
      </thead>
      <tbody>
        {departments !== undefined &&
          (departments.data.length !== 0 ? (
            departments.data.map((department, index) => (
              <tr key={index} className='border-b'>
                <th className='p-2.5'>{departments.from + index}</th>
                <td className='p-2.5'>{department.name}</td>
                <td className='p-2.5 space-x-4'>
                  <ViewButton
                    name='View'
                    onClick={() => setSelectedDepartmentId(department.id)}
                  />
                  <DeleteButton
                    name='Delete'
                    onClick={() => handleSubmit(department.id)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='5' className='text-center p-2.5'>
                No data available
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  )
}

export default DepartmentTable
