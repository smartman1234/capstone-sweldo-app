import ActionButton from '../../ui/buttons/ActionButton'

const LeaveTable = ({ leaves }) => {
  return (
    <table className='w-full text-left'>
      <thead className='bg-gray-100 uppercase'>
        <tr>
          <th className='p-2.5'>#</th>
          <th className='p-2.5'>Date</th>
          <th className='p-2.5'>Status</th>
        </tr>
      </thead>
      <tbody>
        {leaves !== undefined &&
          (leaves.data.length !== 0 ? (
            leaves.data.map((leave, index) => (
              <tr key={index} className='border-b'>
                <th className='p-2.5'>{leaves.from + index}</th>
                <td className='p-2.5'>{leave.date}</td>
                <td className='p-2.5'>{leave.status}</td>
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

export default LeaveTable
