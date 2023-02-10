import { useState } from 'react'
import EditButton from '../../ui/buttons/EditButton'
import * as RestApi from '../../../utils/rest_api_util'
import { toast } from 'react-toastify'
import DeleteButton from '../../ui/buttons/DeleteButton'

const DepartmentTable = ({
  departments,
  setSelectedDepartmentId,
  getDepartments,
}) => {
  const [deletingId, setDeletingId] = useState()

  const handleSubmit = async (id) => {
    setDeletingId(id)
    try {
      const result = await RestApi.deleteDepartment(id)
      const response = await result.json()
      if (result.status === 200) {
        getDepartments()
        toast.success(response.message)
      }
      if (result.status === 400) {
        if (response.type === undefined) {
          toast.error(response.message)
        }
      }
    } catch (error) {}
    setDeletingId(undefined)
  }

  return (
    <table className='w-full text-left'>
      <thead className='bg-[#22223b]/80 text-white uppercase rounded-lg'>
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
              <tr
                key={index}
                className='border-b hover:bg-[#22223b]/40 hover:text-white'
              >
                <th className='p-2.5'>{departments.from + index}</th>
                <td className='p-2.5'>{department.name}</td>
                <td className='p-2.5 space-x-4'>
                  <EditButton
                    onClick={() => setSelectedDepartmentId(department.id)}
                  />
                  <DeleteButton
                    onClick={() => handleSubmit(department.id)}
                    loading={deletingId === department.id}
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
