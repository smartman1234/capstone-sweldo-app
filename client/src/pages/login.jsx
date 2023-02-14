import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CustomButton from '../components/ui/buttons/CustomButton'
import CustomInput from '../components/ui/inputs/CustomInput'
import SuccessAlert from '../components/ui/alerts/SuccessAlert'
import DangerAlert from '../components/ui/alerts/DangerAlert'
import * as RestApi from '../utils/rest_api_util'
import BgImage from '../assets/bg-image.jpeg'

const Login = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [success, setSuccess] = useState()

  useEffect(() => {
    const isAdmin = localStorage.getItem('is_admin')
    const token = localStorage.getItem('token')
    if (token) {
      if (isAdmin === '0') {
        navigate('/user/dashboard')
        return
      }
      navigate('/admin/dashboard')
      return
    }
    // eslint-disable-next-line
  }, [])

  const handleSubmit = async () => {
    setLoading(true)
    setError(undefined)
    setSuccess(undefined)

    try {
      const result = await RestApi.login(formData)
      const response = await result.json()
      if (result.status === 200) {
        setFormData((prevData) => {
          return {
            ...prevData,
            email: '',
            password: '',
          }
        })
        localStorage.setItem('avatar', response.user.avatar)
        localStorage.setItem('email', response.user.email)
        localStorage.setItem('first_name', response.user.first_name)
        localStorage.setItem('last_name', response.user.last_name)
        localStorage.setItem('is_admin', response.user.is_admin)
        localStorage.setItem('token', response.user.access_token)
        // Live server return a string not int ???
        if (response.user.is_admin.toString() === '0') {
          navigate('/user/dashboard')
          return
        }
        navigate('/admin/dashboard')
      }
      if (result.status === 400) {
        setError(response)
      }
    } catch (error) {}
    setLoading(false)
  }

  return (
    <div className='overflow-auto scrollbar-hide '>
      <div
        className='absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat bg-center  z-0'
        style={{ backgroundImage: `url(${BgImage})` }}
      ></div>
      <div className='absolute top-0 left-0 w-full h-full bg-black opacity-40 z-10'></div>
      <div className='relative z-20'>
        <div className='h-screen flex justify-center items-center p-5'>
          <div className='bg-white w-full md:w-96 rounded-lg shadow-lg p-8'>
            <div className='mb-8'>
              <h1 className='text-3xl text-center font-bold'>Sweldo App</h1>
            </div>
            {/* Input */}
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
              <CustomInput
                label='Password'
                id='password'
                type='password'
                placeholder='Strong password'
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                error={
                  error !== undefined && error.type === 'password'
                    ? error.message
                    : null
                }
              />
              <DangerAlert
                message={
                  error !== undefined && error.type === undefined
                    ? error.message
                    : null
                }
              />
              <SuccessAlert message={success?.message} />
            </div>
            {/* Login */}
            <div>
              <CustomButton
                name='Login'
                onClick={handleSubmit}
                loading={loading}
                fullWidth={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
