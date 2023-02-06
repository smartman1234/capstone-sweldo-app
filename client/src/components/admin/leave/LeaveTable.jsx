import { useState } from 'react'
import * as RestApi from '../../../utils/rest_api_util'
import { toast } from 'react-toastify'
import DeclineButton from '../../ui/buttons/DeclineButton'
import ViewButton from '../../ui/buttons/ViewButton'

const LeaveTable = ({ leaves, setSelectedLeaveId }) => {
  const [loading, setLoading] = useState(false)

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
                <td className='p-2.5'>
                  {leave.status === 'pending' && (
                    <span className='bg-yellow-500 text-white text-sm capitalize rounded px-2 py-1'>
                      {leave.status}
                    </span>
                  )}
                  {leave.status === 'approved' && (
                    <span className='bg-green-500 text-white text-sm capitalize rounded px-2 py-1'>
                      {leave.status}
                    </span>
                  )}
                  {leave.status === 'declined' && (
                    <span className='bg-red-500 text-white text-sm capitalize rounded px-2 py-1'>
                      {leave.status}
                    </span>
                  )}
                </td>
                <td className='p-2.5 space-x-4'>
                   <ViewButton
                    name='View'
                    onClick={() => setSelectedLeaveId(leave.id)}
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
