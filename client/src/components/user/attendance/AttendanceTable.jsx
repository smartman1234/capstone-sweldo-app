const AttendanceTable = ({ attendances }) => {
  return (
    <table className='w-full text-left'>
      <thead className='bg-[#22223b]/80 text-white uppercase rounded-lg'>
        <tr>
          <th className='p-2.5'>#</th>
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
              <tr
                key={index}
                className='border-b hover:bg-[#22223b]/40 hover:text-white'
              >
                <th className='p-2.5'>{attendances.from + index}</th>
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
                    <div className='bg-emerald-400 text-center text-white text-sm capitalize rounded-full px-2 py-1 w-20 font-semibold '>
                      {attendance.status}
                    </div>
                  )}
                  {attendance.status === 'late' && (
                    <div className='bg-red-400 text-center text-white text-sm capitalize rounded-full px-2 py-1 w-20 font-semibold'>
                      {attendance.status}
                    </div>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='6' className='text-center p-2.5'>
                No data available
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  )
}

export default AttendanceTable
