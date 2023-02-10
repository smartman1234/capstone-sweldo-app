import EditButton from '../../ui/buttons/EditButton'

const LeaveTable = ({ leaves, setSelectedLeaveId }) => {
  return (
    <table className='w-full text-left'>
      <thead className='bg-[#22223b]/80 text-white uppercase rounded-lg'>
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
              <tr
                key={index}
                className='border-b hover:bg-[#22223b]/40 hover:text-white'
              >
                <th className='p-2.5'>{leaves.from + index}</th>
                <td className='p-2.5'>{leave.email}</td>
                <td className='p-2.5'>{leave.name}</td>
                <td className='p-2.5'>
                  {new Date(leave.date).toLocaleDateString('default', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </td>
                <td className='p-2.5'>
                  {leave.status === 'pending' && (
                    <div className='bg-yellow-400 text-white text-center text-sm capitalize rounded-full px-2 py-1 w-24'>
                      {leave.status}
                    </div>
                  )}
                  {leave.status === 'approved' && (
                    <div className='bg-emerald-400 text-white text-center text-sm capitalize rounded-full px-2 py-1 w-24'>
                      {leave.status}
                    </div>
                  )}
                  {leave.status === 'declined' && (
                    <div className='bg-red-400 text-white text-center text-sm capitalize rounded-full px-2 py-1 w-24'>
                      {leave.status}
                    </div>
                  )}
                </td>
                <td className='p-2.5 space-x-4'>
                  <EditButton onClick={() => setSelectedLeaveId(leave.id)} />
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

export default LeaveTable
