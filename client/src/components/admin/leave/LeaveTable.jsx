import { useState } from 'react'
import ActionButton from '../../ui/buttons/ActionButton'
import * as RestApi from '../../../utils/rest_api_util'
import { toast } from 'react-toastify'

const LeaveTable = ({ leaves, getLeaves }) => {
  const [loading, setLoading] = useState(false)

  const approveLeave = async (id) => {
    setLoading(true)
    try {
      const result = await RestApi.approveLeave(id)
      const response = await result.json()
      if (result.status === 200) {
        getLeaves(leaves.current_page)
        toast.success(response.message)
      }
    } catch (error) {}
    setLoading(false)
  }

  const declineLeave = async (id) => {
    setLoading(true)
    try {
      const result = await RestApi.declineLeave(id)
      const response = await result.json()
      if (result.status === 200) {
        getLeaves(leaves.current_page)
        toast.success(response.message)
      }
    } catch (error) {}
    setLoading(false)
  }

  return (
    <table className='w-full text-left'>
      <thead className='bg-gray-100 uppercase'>
        <tr>
          <th className='p-2.5'>#</th>
          <th className='p-2.5'>Email</th>
          <th className='p-2.5'>Name</th>
          <th className='p-2.5'>Date</th>
          <th className='p-2.5'>Status</th>
          <th className='p-2.5'>Action</th>
        </tr>
      </thead>
      <tbody>
        {leaves !== undefined &&
          (leaves.data.length !== 0 ? (
            leaves.data.map((leave, index) => (
              <tr key={index} className='border-b'>
                <th className='p-2.5'>{leaves.from + index}</th>
                <td className='p-2.5'>{leave.email}</td>
                <td className='p-2.5'>{leave.name}</td>
                <td className='p-2.5'>{leave.date}</td>
                <td className='p-2.5'>{leave.status}</td>
                <td className='p-2.5 space-x-4'>
                  <ActionButton
                    name='Approve'
                    onClick={() => approveLeave(leave.id)}
                    loading={loading}
                  />
                  <ActionButton
                    name='Decline'
                    onClick={() => declineLeave(leave.id)}
                    loading={loading}
                  />
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
  )
}

export default LeaveTable
