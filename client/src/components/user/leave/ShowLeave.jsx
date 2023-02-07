import { useEffect, useState } from 'react'
import * as RestApi from '../../../utils/rest_api_util'

const ShowLeave = ({ selectedLeaveId, setSelectedLeaveId }) => {
  const [formData, setFormData] = useState({
    reason: '',
  })

  useEffect(() => {
    getLeave()
  }, [])

  const getLeave = async () => {
    try {
      const result = await RestApi.getLeave(selectedLeaveId)
      const response = await result.json()
      if (result.status === 200) {
        setFormData(response.leave)
      }
    } catch (error) {}
  }

  return (
    <div className='bg-black/75 fixed top-0 left-0 z-10 w-full h-screen p-5'>
      <div className='w-full h-full flex justify-center items-center'>
        <div className='bg-white w-full lg:w-1/2 rounded flex flex-col p-5'>
          {/* Form title */}
          <div className='flex justify-between'>
            <div className='mb-4'>
              <h1 className='text-3xl font-bold'>Leave Request</h1>
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
        </div>
      </div>
    </div>
  )
}

export default ShowLeave
