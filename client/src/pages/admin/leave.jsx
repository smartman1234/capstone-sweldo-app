import { useEffect, useState } from 'react'
import CustomInput from '../../components/ui/inputs/CustomInput'
import PageTitle from '../../components/ui/titles/PageTitle'
import Pagination from '../../components/Pagination'
import * as RestApi from '../../utils/rest_api_util'

const Leave = () => {
  const [formData, setFormData] = useState({
    name: '',
  })
  const [leaves, setLeaves] = useState()

  useEffect(() => {
    getLeaves()
  }, [])

  const getLeaves = async () => {
    try {
      const result = await RestApi.getLeaves()
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
          placeholder='Search for employee name'
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <table className='w-full text-left'>
          <thead className='bg-gray-100 uppercase'>
            <tr>
              <th className='p-2.5'>#</th>
              <th className='p-2.5'>Employee Name</th>
              <th className='p-2.5'>Date</th>
              <th className='p-2.5'>Status</th>
              <th className='p-2.5'>Action</th>
            </tr>
          </thead>
          <tbody>
            {leaves !== undefined &&
              (leaves.data.length !== 0 ? (
                leaves.data.map((employee, index) => (
                  <tr key={index} className='border-b'>
                    <th className='p-2.5'>{leaves.from + index}</th>
                    <td className='p-2.5'>{employee.name}</td>
                    <td className='p-2.5'>{employee.date}</td>
                    <td className='p-2.5'>{employee.status}</td>
                    <td className='p-2.5'>
                      <button onClick={() => {}}>Accept</button>
                      <button onClick={() => {}}>Decline</button>
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
        <Pagination pagination={leaves} onClick={() => {}} />
      </div>
    </div>
  )
}

export default Leave
