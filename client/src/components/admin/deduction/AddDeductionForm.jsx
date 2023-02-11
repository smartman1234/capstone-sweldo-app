import { useState } from 'react'
import CustomInput from '../../ui/inputs/CustomInput'
import CustomButton from '../../ui/buttons/CustomButton'
import * as RestApi from '../../../utils/rest_api_util'
import { toast } from 'react-toastify'

const AddDeductionForm = ({ toggleAddForm, getDeductions }) => {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const handleSubmit = async () => {
    setLoading(true)
    setError(undefined)

    try {
      const result = await RestApi.addDeduction(formData)
      const response = await result.json()
      if (result.status === 200) {
        toggleAddForm()
        getDeductions()
        toast.success(response.message)
      }
      if (result.status === 400) {
        setError(response)
      }
    } catch (error) {}
    setLoading(false)
  }

  return (
    <div className='bg-black/75 fixed top-0 left-0 z-10 w-full h-screen p-5'>
      <div className='w-full h-full flex justify-center items-center'>
        <div className='bg-white w-full lg:w-1/2 rounded flex flex-col p-8'>
          {/* Form title */}
          <div className='flex justify-between'>
            <div className='mb-8'>
              <h1 className='text-3xl font-bold'>Create Deduction</h1>
            </div>
            <div>
              <button
                className='font-medium p-2 rounded'
                onClick={toggleAddForm}
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
            <CustomInput
              label='Name'
              id='name'
              type='text'
              placeholder='Phil health'
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              error={
                error !== undefined && error.type === 'name'
                  ? error.message
                  : null
              }
            />
            <CustomInput
              label='Amount'
              id='amount'
              type='number'
              placeholder='5000'
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              error={
                error !== undefined && error.type === 'amount'
                  ? error.message
                  : null
              }
            />
          </div>
          <CustomButton
            name='Create'
            onClick={handleSubmit}
            loading={loading}
            fullWidth={true}
          />
        </div>
      </div>
    </div>
  )
}

export default AddDeductionForm
