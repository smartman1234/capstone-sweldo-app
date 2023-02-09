import PageTitle from '../../ui/titles/PageTitle'

const RecentAttendance = ({ recentAttendances }) => {
  return (
    <div className='bg-white p-5 rounded-lg drop-shadow-xl'>
      <h2 className='text-lg font-bold mb-4'>Recent Attendance</h2>
      <table className='w-full text-left'>
        <thead className='bg-indigo-400 uppercase'>
          <tr>
            <th className='p-2.5'>#</th>
            <th className='p-2.5'>Name</th>
            <th className='p-2.5'>Date</th>
            <th className='p-2.5'>Status</th>
          </tr>
        </thead>
        <tbody>
          {recentAttendances !== undefined &&
            (recentAttendances.length !== 0 ? (
              recentAttendances.map((recentAttendance, index) => (
                <tr key={index} className='border-b odd:bg-blue-200 even:bg-slate-100 hover:bg-indigo-300'>
                  <th className='p-2.5'>{index + 1}</th>
                  <td className='p-2.5'>{recentAttendance.name}</td>
                  <td className='p-2.5'>
                    {new Date(recentAttendance.clock_in).toLocaleDateString(
                      'default',
                      {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      }
                    )}
                  </td>
                  <td className='p-2.5'>
                    {recentAttendance.status === 'present' && (
                      <div className='bg-emerald-400 text-center text-white text-sm capitalize rounded-full px-2 py-1 w-24'>
                        {recentAttendance.status}
                      </div>
                    )}
                    {recentAttendance.status === 'late' && (
                      <div className='bg-red-400 text-center text-white text-sm capitalize rounded-full px-2 py-1 w-24'>
                        {recentAttendance.status}
                      </div>
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
