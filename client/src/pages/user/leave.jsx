import { useEffect, useState } from 'react'
import PageTitle from '../../components/ui/titles/PageTitle'
import Pagination from '../../components/Pagination'
import * as RestApi from '../../utils/rest_api_util'
import AddLeaveForm from '../../components/user/leave/AddLeaveForm'
import LeaveTable from '../../components/user/leave/LeaveTable'

const Leave = () => {
  const [showAddForm, setShowAddForm] = useState(false)
  const [leaves, setleaves] = useState()

  useEffect(() => {
    getLeaves()
  }, [])

  const getLeaves = async (page = 1) => {
    try {
      const result = await RestApi.getLeaves(page)
      const response = await result.json()
      if (result.status === 200) {
        setleaves(response.leaves)
      }
    } catch (error) {}
  }

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm)
  }

  return (
    <div>
      <PageTitle title='Leave' />
      <div className='space-y-4'>
        <div className='flex space-x-4'>
          <button
            className='bg-blue-600 text-white font-medium px-5 py-2.5 rounded hover:bg-blue-700'
            onClick={toggleAddForm}
          >
            Add
          </button>
        </div>
        <LeaveTable leaves={leaves} />
        <Pagination pagination={leaves} onClick={getLeaves} />
      </div>
      {showAddForm && <AddLeaveForm toggleAddForm={toggleAddForm} />}
    </div>
  )
}

export default Leave
