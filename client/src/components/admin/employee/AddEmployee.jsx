import { useState } from 'react'
import CustomButton from '../../ui/buttons/CustomButton'
import CustomInput from '../../ui/inputs/CustomInput'
import SuccessAlert from '../../ui/alerts/SuccessAlert'
import * as RestApi from '../../../utils/rest_api_util'

const AddEmployee = () => {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    birthday: '',
    gender: '',
    address: '',
    phone: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [success, setSuccess] = useState()

  const toggleForm = () => {
    setShowForm(!showForm)
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError(undefined)
    setSuccess(undefined)

    try {
      const result = await RestApi.addEmployee(formData)
      const response = await result.json()
      if (result.status === 400) {
        setError(response)
      }

      if (result.status === 200) {
        setFormData((prevData) => {
          return {
            ...prevData,
            email: '',
            password: '',
            first_name: '',
            last_name: '',
            birthday: '',
            gender: '',
            address: '',
            phone: '',
          }
        })
        setSuccess(response)
      }
    } catch (error) {}
    setLoading(false)
  }

  return (
    <>
      <div className='bg-slate-200  '>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={toggleForm}
        >
          New
        </button>
      </div>
      {showForm && (
        <div className='bg-black/75 fixed top-0 left-0 z-10 w-full h-screen p-5'>
          <div className='w-full h-full flex justify-center'>
            <div className='bg-white w-full lg:w-1/2 rounded flex flex-col'>
              {/* Form title */}
              <div className='flex justify-between pt-5 px-5'>
                <h1 title='Task List' />
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
                <CustomInput
                  label='Email'
                  id='email'
                  type='email'
                  placeholder='JohnDoe@gmail.com'
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value })
                  }}
                  error={
                    error !== undefined && error.type === 'email'
                      ? error.message
                      : null
                  }
                />
                <CustomInput
                  label='Password'
                  id='password'
                  type='password'
                  placeholder='At least 8 characters'
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value })
                  }}
                  error={
                    error !== undefined && error.type === 'password'
                      ? error.message
                      : null
                  }
                />
                <CustomInput
                  label='First Name'
                  id='first_name'
                  type='text'
                  placeholder='John'
                  value={formData.first_name}
                  onChange={(e) => {
                    setFormData({ ...formData, first_name: e.target.value })
                  }}
                  error={
                    error !== undefined && error.type === 'first_name'
                      ? error.message
                      : null
                  }
                />
                <CustomInput
                  label='Last Name'
                  id='last_name'
                  type='text'
                  placeholder='Doe'
                  value={formData.last_name}
                  onChange={(e) => {
                    setFormData({ ...formData, last_name: e.target.value })
                  }}
                  error={
                    error !== undefined && error.type === 'last_name'
                      ? error.message
                      : null
                  }
                />
                <CustomInput
                  label='Birth Date'
                  id='birthday'
                  type='date'
                  placeholder='dd/mm/yyyy'
                  value={formData.birthday}
                  onChange={(e) => {
                    setFormData({ ...formData, birthday: e.target.value })
                  }}
                  error={
                    error !== undefined && error.type === 'birthday'
                      ? error.message
                      : null
                  }
                />
                <CustomInput
                  label='Gender'
                  id='gender'
                  type='text'
                  placeholder='Male or Female'
                  value={formData.gender}
                  onChange={(e) => {
                    setFormData({ ...formData, gender: e.target.value })
                  }}
                  error={
                    error !== undefined && error.type === 'gender'
                      ? error.message
                      : null
                  }
                />
                <div className='col-span-2'>
                  <CustomInput
                    label='Address'
                    id='address'
                    type='text'
                    placeholder='Complete Address'
                    value={formData.address}
                    onChange={(e) => {
                      setFormData({ ...formData, address: e.target.value })
                    }}
                    error={
                      error !== undefined && error.type === 'address'
                        ? error.message
                        : null
                    }
                  />
                </div>
                <div className='col-span-2'>
                  <CustomInput
                    label='Phone #'
                    id='phone'
                    type='number'
                    placeholder='+63 9912 345 678'
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value })
                    }}
                    error={
                      error !== undefined && error.type === 'phone'
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

export default AddEmployee
