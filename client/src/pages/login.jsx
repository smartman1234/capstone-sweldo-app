import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as RestApi from '../utils/rest_api_util'

const Login = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [success, setSuccess] = useState()

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
        localStorage.setItem('email', response.user.email)
        localStorage.setItem('first_name', response.user.first_name)
        localStorage.setItem('last_name', response.user.last_name)
        localStorage.setItem('is_admin', response.user.is_admin)
        localStorage.setItem('token', response.user.access_token)
        if (response.user.is_admin === 0) {
          navigate('/dashboard')
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
    <div className=''>
      <div>
        <div className='mb-4'>
          <h1 className='text-3xl font-bold'>Sweldo App</h1>
        </div>
        {/* Input */}
        <div className='mb-8 space-y-4'>
          <div>
            <label htmlFor='username' className='block'>
              Username
            </label>
            <input
              type='text'
              placeholder='Username'
              className='border'
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor='password' className='block'>
              Password
            </label>
            <input
              type='password'
              placeholder='Password'
              className='border'
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
        </div>
        {/* Login */}
        <div>
          <button onClick={handleSubmit}>Login</button>
        </div>
      </div>
    </div>
  )
}

export default Login
