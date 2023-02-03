import { useEffect, useState  } from 'react'
import SuccessAlert from '../../components/ui/alerts/SuccessAlert'
import CustomButton from '../../components/ui/buttons/CustomButton'
import CustomInput from '../../components/ui/inputs/CustomInput'
import PageTitle from '../../components/ui/titles/PageTitle'
import * as RestApi from '../../utils/rest_api_util'
import { toast } from 'react-toastify'

const Profile = () => {
  const [edit, setEdit] = useState(false)

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
      }
      if (result.status === 400) {
        setError(response)
      }
    } catch (error) {}
    setLoading(false)
  }

  return (
    <div>
      <PageTitle title='Profile' />
      <div className="flex justify-center">
        <label htmlFor="imgupload" className='outline outline-black rounded-full   h-24 w-24' disabled={!edit} />
        <input type='file' hidden id='imgupload' multiple accept="image/*" className='bg-black rounded-full  h-24 w-24' name='test' disabled={!edit} />
      </div>
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
