const PayrollTable = () => {
  return (
    <div>
      <table className='w-full text-left'>
        <thead className='bg-gray-100 uppercase'>
          <tr>
            <th className='p-2.5'>#</th>
            <th className='p-2.5'>Name</th>
            <th className='p-2.5'>Total Hours</th>
            <th className='p-2.5'>Deduction</th>
            <th className='p-2.5'>Earning</th>
            <th className='p-2.5'>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='p-2.5'>1</td>
            <td className='p-2.5'>John Doe</td>
            <td className='p-2.5'>462</td>
            <td className='p-2.5'>352</td>
            <td className='p-2.5'>700</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default PayrollTable
