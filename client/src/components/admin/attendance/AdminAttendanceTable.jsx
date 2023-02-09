const AdminAttendanceTable = ({ attendances }) => {
  return (
    <table className='w-full text-left'>
      <thead className='bg-indigo-400 uppercase rounded-lg'>
        <tr>
          <th className='p-2.5'>#</th>
          <th className='p-2.5'>Name</th>
          <th className='p-2.5'>Date</th>
          <th className='p-2.5'>Clock In</th>
          <th className='p-2.5'>Clock Out</th>
          <th className='p-2.5'>Total Hours</th>
          <th className='p-2.5'>Status</th>
        </tr>
      </thead>
      <tbody>
        {attendances !== undefined &&
          (attendances.data.length !== 0 ? (
            attendances.data.map((attendance, index) => (
              <tr key={index} className='border-b odd:bg-blue-200 even:bg-slate-100 hover:bg-indigo-300'>
                <th className='p-2.5'>{attendances.from + index}</th>
                <td className='p-2.5'>{attendance.name}</td>
                <td className='p-2.5'>
                  {new Date(attendance.clock_in).toLocaleDateString('default', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </td>
                <td className='p-2.5'>
                  {new Date(attendance.clock_in).toLocaleTimeString()}
                </td>
                <td className='p-2.5'>
                  {new Date(attendance.clock_out).toLocaleTimeString()}
                </td>
                <td className='p-2.5'>{attendance.total_hours}</td>
                <td className='p-2.5'>
                  {attendance.status === 'present' && (
                    <div className='bg-emerald-400 text-white text-center text-sm capitalize rounded-full px-2 py-1 w-24'>
                      {attendance.status}
                    </div>
                  )}
                  {attendance.status === 'late' && (
                    <div className='bg-red-400 text-white text-center text-sm capitalize rounded-full px-2 py-1 w-24'>
                      {attendance.status}
                    </div>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='5' className='text-center p-2.5'>
                No attendance available
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  )
}

export default AdminAttendanceTable
