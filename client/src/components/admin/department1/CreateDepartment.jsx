import { useState } from 'react'
import * as RestApi from '../../../utils/rest_api_util'
import CustomButton from '../../ui/buttons/CustomButton'
import CustomInput from '../../ui/inputs/CustomInput'
import PageTitle from '../../ui/titles/PageTitle'
import SuccessAlert from '../../ui/alerts/SuccessAlert'

const CreateDepartment = () => {
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [success, setSuccess] = useState()

  const [formData, setFormData] = useState({
    name: '',
  })

  const toggleForm = () => {
    setShowForm(!showForm)
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError(undefined)
    setSuccess(undefined)

    try {
      const result = await RestApi.addDepartment(formData)
      const response = await result.json()
      if (result.status === 400) {
        setError(response)
      }
      if (result.status === 200) {
        setFormData((prevData) => {
          return {
            ...prevData,
            name: '',
          }
        })
        setSuccess(response)
      }
    } catch (error) {}
    setLoading(false)
  }
  return (
    <>
      <CustomButton name='New' onClick={toggleForm} />
      {showForm && (
        <div className='bg-black/75 fixed top-0 left-0 z-10 w-full h-screen p-5'>
          <div className='w-full h-full flex justify-center'>
            <div className='bg-white w-full lg:w-1/2 rounded flex flex-col'>
              {/* Form title */}
              <div className='flex justify-between pt-5 px-5'>
                <PageTitle title='Create Job Title' />
                <div>
                  <button
                    className='bg-blue-600 text-white font-medium p-2 rounded hover:bg-blue-500'
                    onClick={toggleForm}
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
              <div className='grid grid-cols-1 md:grid-cols-2 gap-5 m-2'>
                <div className='col-span-2 '>
                  <CustomInput
                    label='Department'
                    id='name'
                    type='text'
                    placeholder='IT Department'
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value })
                    }}
                    error={
                      error !== undefined && error.type === 'name'
                        ? error.message
                        : null
                    }
                  />
                </div>

                <div className='col-span-2 flex justify-center'>
                  <CustomButton
                    name='Submit'
                    loading={loading}
                    onClick={handleSubmit}
                    fullWidth={true}
                  />
                </div>
                <div className='col-span-2 flex justify-center'>
                  <SuccessAlert message={success?.message} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CreateDepartment
