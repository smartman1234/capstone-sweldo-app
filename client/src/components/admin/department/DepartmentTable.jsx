import { useEffect, useState } from 'react'
import ActionButton from '../../ui/buttons/ActionButton'
import * as RestApi from '../../../utils/rest_api_util'

const DepartmentTable = ({
  departments,
  setSelectedDepartmentId,
  selectedDepartmentId,
}) => {
  const [error, setError] = useState()

  // delete department

  const handleSubmit = async (id) => {
    try {
      const result = await RestApi.deleteDepartment(id)
      const response = await result.json()

      if (result.status === 200) {
      }

      if (result.status === 400) {
        setError(response)
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
                  <ActionButton
                    name='View'
                    onClick={() => setSelectedDepartmentId(department.id)}
                  />
                  <ActionButton
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
