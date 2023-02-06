import { useEffect, useState } from 'react'
import CustomInput from '../../ui/inputs/CustomInput'
import ApproveButton from '../../ui/buttons/ApproveButton'
import * as RestApi from '../../../utils/rest_api_util'
import { toast } from 'react-toastify'
import DeclineButton from '../../ui/buttons/DeclineButton'

const ShowAdminLeave = ({ selectedLeaveId, setSelectedLeaveId, getLeaves }) => {
  const [formData, setFormData] = useState({
    reason: '',
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getLeave()
  }, [])

  const getLeave = async () => {
    try {
      const result = await RestApi.getAdminLeave(selectedLeaveId)
      const response = await result.json()
      if (result.status === 200) {
        setFormData(response.leave)
      }
    } catch (error) {}
  }

  const approveLeave = async () => {
    setLoading(true)
    try {
      const result = await RestApi.approveLeave(selectedLeaveId)
      const response = await result.json()
      if (result.status === 200) {
        setSelectedLeaveId(undefined)
        getLeaves()
        toast.success(response.message)
      }
    } catch (error) {}
    setLoading(false)
  }

  const declineLeave = async () => {
    setLoading(true)
    try {
      const result = await RestApi.declineLeave(selectedLeaveId)
      const response = await result.json()
      if (result.status === 200) {
        setSelectedLeaveId(undefined)
        getLeaves()
        toast.success(response.message)
      }
    } catch (error) {}
    setLoading(false)
  }

  return (
    <div className='bg-black/75 fixed top-0 left-0 z-10 w-full h-screen p-5'>
      <div className='w-full h-full flex justify-center items-center'>
        <div className='bg-white w-full lg:w-1/2 rounded flex flex-col p-5'>
          {/* Form title */}
          <div className='flex justify-between'>
            <div className='mb-4'>
              <h1 className='text-3xl font-bold'>Reason</h1>
            </div>
            <div>
              <button
                className='bg-blue-600 text-white font-medium p-2 rounded hover:bg-blue-500'
                onClick={() => setSelectedLeaveId(undefined)}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>
          </div>
          {/* Form */}
          <div className='mb-8 space-y-4'>
            <div>
              <label
                htmlFor='reason'
                className='block text-gray-700 text-sm font-medium mb-2'
              >
                Reason
              </label>
              <textarea
                className='w-full text-gray px-5 py-2.5 rounded border'
                id='reason'
                placeholder='Reason'
                value={formData.reason}
                disabled
              />
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <ApproveButton
              name='Approve'
              onClick={approveLeave}
              loading={loading}
            />
            <DeclineButton
              name='Decline'
              onClick={declineLeave}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowAdminLeave
