import ViewButton from '../../ui/buttons/ViewButton'
import * as RestApi from '../../../utils/rest_api_util'
import { toast } from 'react-toastify'
import DeleteButton from '../../ui/buttons/DeleteButton'
import { useState } from 'react'

const JobTable = ({ jobs, setSelectedJobId, getJobs }) => {
  const [deletingId, setDeletingId] = useState()

  const handleSubmit = async (id) => {
    setDeletingId(id)
    try {
      const result = await RestApi.deleteJob(id)
      const response = await result.json()
      if (result.status === 200) {
        getJobs()
        toast.success(response.message)
      }
      if (result.status === 400) {
        if (response.type === undefined) {
          toast.error(response.message)
        }
      }
    } catch (error) {}
    setDeletingId(undefined)
  }

  return (
    <table className='w-full text-left'>
      <thead className='bg-gray-100 uppercase rounded-lg'>
        <tr>
          <th className='p-2.5'>#</th>
          <th className='p-2.5'>Name</th>
          <th className='p-2.5'>Salary</th>
          <th className='p-2.5'>Action</th>
        </tr>
      </thead>
      <tbody>
        {jobs !== undefined &&
          (jobs.data.length !== 0 ? (
            jobs.data.map((job, index) => (
              <tr key={index} className='border-b'>
                <th className='p-2.5'>{jobs.from + index}</th>
                <td className='p-2.5'>{job.name}</td>
                <td className='p-2.5'>{job.salary}</td>
                <td className='p-2.5 space-x-4'>
                  <ViewButton
                    name='View'
                    onClick={() => setSelectedJobId(job.id)}
                  />
                  <DeleteButton
                    name='Delete'
                    onClick={() => handleSubmit(job.id)}
                    loading={deletingId === job.id}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='5' className='text-center p-2.5'>
                No data available
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  )
}

export default JobTable
