import PageTitle from '../../ui/titles/PageTitle'

const RecentAttendance = ({ recentAttendances }) => {

  return (
    <div>

    <PageTitle title='Recent Attendance'/>
    <table className='w-full text-left'>
      <thead className='bg-gray-100 uppercase'>
        <tr>
          <th className='p-2.5'>#</th>
          <th className='p-2.5'>Email</th>
          <th className='p-2.5'>Name</th>
          <th className='p-2.5'>Date</th>
          <th className='p-2.5'>Status</th>
        </tr>
      </thead>
      <tbody>
        {recentAttendances !== undefined &&
          (recentAttendances.length !== 0 ? (
            recentAttendances.map((recentAttendance, index) => (
              <tr key={index} className='border-b'>
                <th className='p-2.5'>{index + 1}</th>
                <td className='p-2.5'>{recentAttendance.email}</td>
                <td className='p-2.5'>{recentAttendance.name}</td>
                <td className='p-2.5'>
                  {new Date(recentAttendance.clock_in).toLocaleDateString('default', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </td>
                <td className='p-2.5'>
                  {recentAttendance.status === 'present' && (
                    <span className='bg-green-500 text-white text-sm capitalize rounded px-2 py-1'>
                      {recentAttendance.status}
                    </span>
                  )}
                  {recentAttendance.status === 'late' && (
                    <span className='bg-red-500 text-white text-sm capitalize rounded px-2 py-1'>
                      {recentAttendance.status}
                    </span>
                  )}
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
    </div>
  )
}

export default RecentAttendance
