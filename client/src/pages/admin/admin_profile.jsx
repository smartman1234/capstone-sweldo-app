import { useState } from 'react'
import CustomButton from '../../components/ui/buttons/CustomButton'
import CustomInput from '../../components/ui/inputs/CustomInput'
import PageTitle from '../../components/ui/titles/PageTitle'

const AdminProfile = () => {
  const [formData, setFormData] = useState({
    email: '',
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

  const handleSubmit = async () => {
    setLoading(true)
    setError(undefined)
    setSuccess(undefined)

    try {
    } catch (error) {}
    setLoading(false)
  }

  return (
    <div>
      <PageTitle title='Profile' />
      <div className='mb-8 space-y-4'>
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
            >
              <option selected={formData.gender === 'male' ? true : false} value='male'>Male</option>
              <option selected={formData.gender === 'female' ? true : false} value='female'>Female</option>
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
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          error={
            error !== undefined && error.type === 'phone' ? error.message : null
          }
        />
      </div>
      <CustomButton
        name='Update'
        onClick={handleSubmit}
        loading={loading}
        fullWidth={true}
      />
    </div>
  )
}

export default AdminProfile
