import { useEffect, useState } from 'react'
import CustomInput from '../../components/ui/inputs/CustomInput'
import PageTitle from '../../components/ui/titles/PageTitle'
import Pagination from '../../components/Pagination'
import LeaveTable from '../../components/admin/leave/LeaveTable'
import * as RestApi from '../../utils/rest_api_util'

const AdminLeave = () => {
  const [formData, setFormData] = useState({
    name: '',
  })

  const [leaves, setLeaves] = useState()

  useEffect(() => {
    getLeaves()
  }, [])

  const getLeaves = async (page = 1) => {
    if (formData.name !== '') {
      searchLeaves(formData.name, page)
      return
    }
    try {
      const result = await RestApi.getLeaves(page)
      const response = await result.json()
      if (result.status === 200) {
        setLeaves(response.leaves)
      }
    } catch (error) {}
  }

  const searchLeaves = async (name, page = 1) => {
    try {
      const result = await RestApi.searchLeaves(name, page)
      const response = await result.json()
      if (result.status === 200) {
        setLeaves(response.leaves)
      }
    } catch (error) {}
  }

  return (
    <div>
      <PageTitle title='Leave' />
      <div className='space-y-4'>
        <CustomInput
          id='name'
          type='text'
          placeholder='Search for employee email or name'
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value })
            searchLeaves(e.target.value)
          }}
        />
        <LeaveTable
          leaves={leaves}
          getLeaves={getLeaves}
        />
        <Pagination pagination={leaves} onClick={getLeaves} />
      </div>
    </div>
  )
}

export default AdminLeave
