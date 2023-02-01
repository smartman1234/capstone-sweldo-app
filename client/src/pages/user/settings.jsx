import { useState } from 'react'
import DangerAlert from '../../components/ui/alerts/DangerAlert'
import SuccessAlert from '../../components/ui/alerts/SuccessAlert'
import CustomButton from '../../components/ui/buttons/CustomButton'
import CustomInput from '../../components/ui/inputs/CustomInput'
import PageTitle from '../../components/ui/titles/PageTitle'
import * as RestApi from '../../utils/rest_api_util'

const Settings = () => {
  const [formData, setFormData] = useState({
    old_password: '',
    new_password: '',
    confirm_new_password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [success, setSuccess] = useState()

  const handleSubmit = async () => {
    setLoading(true)
    setError(undefined)
    setSuccess(undefined)

    if (formData.new_password !== formData.confirm_new_password) {
      setError({
        message: 'Confirm password does not match',
        type: 'confirm_new_password',
      })
      setLoading(false)
      return
    }

    try {
      const result = await RestApi.updateSettings(formData)
      const response = await result.json()
      if (result.status === 200) {
        setFormData((prevData) => {
          return {
            ...prevData,
            old_password: '',
            new_password: '',
            confirm_new_password: '',
          }
        })
        setSuccess(response)
      }
      if (result.status === 400) {
        setError(response)
      }
    } catch (error) {}
    setLoading(false)
  }

  return (
    <div>
      <PageTitle title='Settings' />
      <div className='mb-8 space-y-4'>
        <CustomInput
          label='Old Password'
          id='old_password'
          type='password'
          placeholder='Old Password'
          value={formData.old_password}
          onChange={(e) =>
            setFormData({ ...formData, old_password: e.target.value })
          }
          error={
            error !== undefined && error.type === 'old_password'
              ? error.message
              : null
          }
        />
        <CustomInput
          label='New Password'
          id='new_password'
          type='password'
          placeholder='New Password'
          value={formData.new_password}
          onChange={(e) =>
            setFormData({ ...formData, new_password: e.target.value })
          }
          error={
            error !== undefined && error.type === 'new_password'
              ? error.message
              : null
          }
        />
        <CustomInput
          label='Confirm New Password'
          id='confirm_new_password'
          type='password'
          placeholder='Confirm New Password'
          value={formData.confirm_new_password}
          onChange={(e) =>
            setFormData({ ...formData, confirm_new_password: e.target.value })
          }
          error={
            error !== undefined && error.type === 'confirm_new_password'
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
      <CustomButton
        name='Update'
        onClick={handleSubmit}
        loading={loading}
        fullWidth={true}
      />
    </div>
  )
}

export default Settings
