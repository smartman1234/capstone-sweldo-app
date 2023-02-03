import ActionButton from '../../ui/buttons/ActionButton'
import * as RestApi from '../../../utils/rest_api_util'

const JobTable = ({ jobs, setSelectedJobId, getJobs }) => {
  const handleSubmit = async (id) => {
    try {
      const result = await RestApi.deleteJob(id)
      const response = await result.json()
      if (result.status === 200) {
        getJobs()
      }
      if (result.status === 400) {
      }
    } catch (error) {}
  }
  
  return (
    <table className='w-full text-left'>
      <thead className='bg-gray-100 uppercase'>
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
                  <ActionButton
                    name='View'
                    onClick={() => setSelectedJobId(job.id)}
                  />
                  <ActionButton
                    name='Delete'
                    onClick={() => handleSubmit(job.id)}
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
