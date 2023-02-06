import { useEffect, useState } from 'react'
import CustomButton from '../../components/ui/buttons/CustomButton'
import CustomInput from '../../components/ui/inputs/CustomInput'
import PageTitle from '../../components/ui/titles/PageTitle'
import * as RestApi from '../../utils/rest_api_util'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const navigate = useNavigate()
  const [edit, setEdit] = useState(false)

  const [formData, setFormData] = useState({
    avatar: '',
    email: '',
    first_name: '',
    last_name: '',
    birthday: '',
    gender: '',
    address: '',
    phone: '',
    department_name: '',
    job_name: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [selectedImage, setSelectedImage] = useState()

  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = async () => {
    try {
      const result = await RestApi.getProfile()
      const response = await result.json()
      if (result.status === 200) {
        setFormData(response.user)
      }
    } catch (error) {}
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError(undefined)

    try {
      const result = await RestApi.updateProfile(formData)
      const response = await result.json()
      if (result.status === 200) {
        setEdit(false)
        toast.success(response.message)
        // Update name
        localStorage.setItem('first_name', response.first_name)
        // Navigate to this page to update sidebar, coz we don't use state management
        navigate('/user/profile')
      }
      if (result.status === 400) {
        setError(response)
      }
    } catch (error) {}
    setLoading(false)
  }

  const uploadAvatar = async () => {
    setLoading(true)

    try {
      const customForm = new FormData()
      customForm.append('image', selectedImage)
      const result = await RestApi.uploadAvatar(customForm)
      const response = await result.json()
      if (result.status === 200) {
        setSelectedImage(undefined)
        toast.success(response.message)
        // Update avatar
        localStorage.setItem('avatar', response.avatar)
        // Navigate to this page to update sidebar, coz we don't use state management
        navigate('/user/profile')
      }
    } catch (error) {}
    setLoading(false)
  }

  return (
    <div>
      <PageTitle title='Profile' />
      <div className='mb-8 space-y-4'>
        <div className='flex flex-col items-center'>
          {formData.avatar === null ? (
            <div className='w-20 h-20 flex justify-center items-center rounded-full bg-gray-500'>
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
                  d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
                />
              </svg>
            </div>
          ) : (
            <img
              src={formData.avatar}
              alt='Avatar'
              className='w-20 h-20 rounded-full'
            />
          )}
          <label htmlFor='avatar' className='flex gap-5'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5'
              />
            </svg>
            Upload Avatar
          </label>
          <input
            id='avatar'
            hidden
            type='file'
            accept='image/*'
            onChange={(e) => {
              // Preview
              setFormData({
                ...formData,
                avatar: URL.createObjectURL(e.target.files[0]),
              })
              // Set image
              setSelectedImage(e.target.files[0])
            }}
          />
          {selectedImage && (
            <CustomButton
              name='Upload Avatar'
              onClick={uploadAvatar}
              loading={loading}
            />
          )}
        </div>
        <CustomInput
          label='Email'
          id='email'
          type='email'
          placeholder='johndoe@gmail.com'
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={
            error !== undefined && error.type === 'email' ? error.message : null
          }
          disabled={true}
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
            disabled={!edit}
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
            disabled={!edit}
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
            disabled={!edit}
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
              disabled={!edit}
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
          disabled={!edit}
        />
        <CustomInput
          label='Phone'
          id='phone'
          type='text'
          placeholder='09xx xxxx xxx'
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          error={
            error !== undefined && error.type === 'phone' ? error.message : null
          }
          disabled={!edit}
        />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <CustomInput
            label='Department'
            id='department'
            type='text'
            value={formData.department_name}
            disabled={true}
          />
          <CustomInput
            label='Job'
            id='job'
            type='text'
            value={formData.job_name}
            disabled={true}
          />
        </div>
      </div>
      {edit ? (
        <CustomButton
          name='Update'
          onClick={handleSubmit}
          loading={loading}
          fullWidth={true}
        />
      ) : (
        <CustomButton
          name='Edit'
          onClick={() => setEdit(true)}
          fullWidth={true}
        />
      )}
    </div>
  )
}

export default Profile
