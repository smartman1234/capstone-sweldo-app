import { useEffect, useState } from 'react'
import CustomInput from '../../components/ui/inputs/CustomInput'
import PageTitle from '../../components/ui/titles/PageTitle'
import Pagination from '../../components/Pagination'
import * as RestApi from '../../utils/rest_api_util'
import ActionButton from '../../components/ui/buttons/ActionButton'

const Leave = () => {
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

  const approveLeave = async (id) => {
    try {
      const result = await RestApi.approveLeave(id)
      const response = await result.json()
      if (result.status === 200) {
        getLeaves(leaves.current_page)
      }
    } catch (error) {}
  }

  const declineLeave = async (id) => {
    try {
      const result = await RestApi.declineLeave(id)
      const response = await result.json()
      if (result.status === 200) {
        getLeaves(leaves.current_page)
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
          placeholder='Search for employee name or email'
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value })
            searchLeaves(e.target.value)
          }}
        />
        <table className='w-full text-left'>
          <thead className='bg-gray-100 uppercase'>
            <tr>
              <th className='p-2.5'>#</th>
              <th className='p-2.5'>Email</th>
              <th className='p-2.5'>Name</th>
              <th className='p-2.5'>Date</th>
              <th className='p-2.5'>Status</th>
              <th className='p-2.5'>Action</th>
            </tr>
          </thead>
          <tbody>
            {leaves !== undefined &&
              (leaves.data.length !== 0 ? (
                leaves.data.map((leave, index) => (
                  <tr key={index} className='border-b'>
                    <th className='p-2.5'>{leaves.from + index}</th>
                    <td className='p-2.5'>{leave.email}</td>
                    <td className='p-2.5'>{leave.name}</td>
                    <td className='p-2.5'>{leave.date}</td>
                    <td className='p-2.5'>{leave.status}</td>
                    <td className='p-2.5 space-x-4'>
                      <ActionButton
                        name='Approve'
                        onClick={() => approveLeave(leave.id)}
                      />
                      <ActionButton
                        name='Decline'
                        onClick={() => declineLeave(leave.id)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='5' className='text-center p-2.5'>
                    No leave available
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <Pagination pagination={leaves} onClick={getLeaves} />
      </div>
    </div>
  )
}

export default Leave
