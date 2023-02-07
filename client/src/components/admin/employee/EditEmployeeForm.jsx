import { useEffect, useState } from 'react'
import CustomInput from '../../ui/inputs/CustomInput'
import CustomButton from '../../ui/buttons/CustomButton'
import * as RestApi from '../../../utils/rest_api_util'
import { toast } from 'react-toastify'

const EditEmployeeForm = ({
  selectedEmployeeId,
  setSelectedEmployeeId,
  getEmployees,
}) => {
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    birthday: '',
    gender: 'male',
    address: '',
    phone: '',
    department_id: '',
    job_id: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const [departments, setDepartments] = useState()
  const [jobs, setJobs] = useState()

  useEffect(() => {
    getDepartments()
    getJobs()
    getEmployee()
  }, [])

  const getDepartments = async (page = 1) => {
    try {
      const result = await RestApi.getDepartments(page)
      const response = await result.json()
      if (result.status === 200) {
        setDepartments(response.departments)
      }
    } catch (error) {}
  }

  const getJobs = async (page = 1) => {
    try {
      const result = await RestApi.getJobs(page)
      const response = await result.json()
      if (result.status === 200) {
        setJobs(response.jobs)
      }
    } catch (error) {}
  }

  const getEmployee = async () => {
    try {
      const result = await RestApi.getEmployee(selectedEmployeeId)
      const response = await result.json()
      if (result.status === 200) {
        setFormData(response.employee)
      }
    } catch (error) {}
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError(undefined)

    try {
      const result = await RestApi.updateEmployee(selectedEmployeeId, formData)
      const response = await result.json()
      if (result.status === 200) {
        setSelectedEmployeeId(undefined)
        getEmployees()
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
        <div className='bg-white w-full lg:w-1/2 rounded flex flex-col p-5'>
          {/* Form title */}
          <div className='flex justify-between'>
            <div className='mb-4'>
              <h1 className='text-3xl font-bold'>Edit Employee</h1>
            </div>
            <div>
              <button
                className='bg-blue-600 text-white font-medium p-2 rounded hover:bg-blue-500'
                onClick={() => setSelectedEmployeeId(undefined)}
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
              label='Email'
              id='email'
              type='email'
              placeholder='johndoe@gmail.com'
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              error={
                error !== undefined && error.type === 'email'
                  ? error.message
                  : null
              }
            />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <CustomInput
                label='First Name'
                id='first_name'
                type='text'
                placeholder='John'
                value={formData.first_name}
                onChange={(e) =>
                  setFormData({ ...formData, first_name: e.target.value })
                }
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
                onChange={(e) =>
                  setFormData({ ...formData, last_name: e.target.value })
                }
                error={
                  error !== undefined && error.type === 'last_name'
                    ? error.message
                    : null
                }
              />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <CustomInput
                label='Birthday'
                id='birthday'
                type='date'
                value={formData.birthday}
                onChange={(e) =>
                  setFormData({ ...formData, birthday: e.target.value })
                }
                error={
                  error !== undefined && error.type === 'birthday'
                    ? error.message
                    : null
                }
              />
              <div>
                <label
                  htmlFor='gender'
                  className='block text-gray-700 text-sm font-medium mb-2'
                >
                  Gender
                </label>
                <select
                  className='w-full text-gray px-5 py-2.5 rounded border'
                  id='gender'
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                >
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                </select>
              </div>
            </div>
            <CustomInput
              label='Address'
              id='address'
              type='text'
              placeholder='Some address'
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              error={
                error !== undefined && error.type === 'address'
                  ? error.message
                  : null
              }
            />
            <CustomInput
              label='Phone'
              id='phone'
              type='text'
              placeholder='09xx xxxx xxx'
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              error={
                error !== undefined && error.type === 'phone'
                  ? error.message
                  : null
              }
            />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label
                  htmlFor='department'
                  className='block text-gray-700 text-sm font-medium mb-2'
                >
                  Department
                </label>
                <select
                  className='w-full text-gray px-5 py-2.5 rounded border'
                  id='department'
                  value={
                    formData.department_id !== ''
                      ? formData.department_id
                      : 'none'
                  }
                  onChange={(e) =>
                    setFormData({ ...formData, department_id: e.target.value })
                  }
                >
                  <option value='none' disabled>
                    Select a department
                  </option>
                  {departments !== undefined &&
                    (departments.data.length !== 0
                      ? departments.data.map((department, index) => (
                          <option key={index} value={department.id}>
                            {department.name}
                          </option>
                        ))
                      : null)}
                </select>
              </div>
              <div>
                <label
                  htmlFor='job'
                  className='block text-gray-700 text-sm font-medium mb-2'
                >
                  Job
                </label>
                <select
                  className='w-full text-gray px-5 py-2.5 rounded border'
                  id='job'
                  value={formData.job_id !== '' ? formData.job_id : 'none'}
                  onChange={(e) =>
                    setFormData({ ...formData, job_id: e.target.value })
                  }
                >
                  <option value='none' disabled>
                    Select a job
                  </option>
                  {jobs !== undefined &&
                    (jobs.data.length !== 0
                      ? jobs.data.map((job, index) => (
                          <option key={index} value={job.id}>
                            {job.name}
                          </option>
                        ))
                      : null)}
                </select>
              </div>
            </div>
          </div>
          <CustomButton
            name='Update'
            onClick={handleSubmit}
            loading={loading}
            fullWidth={true}
          />
        </div>
      </div>
    </div>
  )
}

export default EditEmployeeForm
