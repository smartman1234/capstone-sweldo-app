import ActionButton from '../../ui/buttons/ActionButton'

const JobTable = ({ jobs, setSelectedJobId }) => {
  return (
    <table className='w-full text-left'>
      <thead className='bg-gray-100 uppercase'>
        <tr>
          <th className='p-2.5'>#</th>
          <th className='p-2.5'>Job Title</th>
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
                <td className='p-2.5 space-x-4'>
                  <ActionButton
                    name='View'
                    onClick={() => setSelectedJobId(job.id)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='5' className='text-center p-2.5'>
                0 Job Title
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  )
}

export default JobTable
