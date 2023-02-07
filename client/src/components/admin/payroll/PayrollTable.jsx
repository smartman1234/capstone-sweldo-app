const PayrollTable = ({ payrolls }) => {
  return (
    <div>
      <table className='w-full text-left'>
        <thead className='bg-gray-100 uppercase'>
          <tr>
            <th className='p-2.5'>#</th>
            <th className='p-2.5'>Name</th>
            <th className='p-2.5'>Total Hours</th>
            <th className='p-2.5'>Earnings</th>
            <th className='p-2.5'>Deduction</th>
            <th className='p-2.5'>Net Pay</th>
          </tr>
        </thead>
        <tbody>
          {payrolls !== undefined &&
            (payrolls.data.length !== 0 ? (
              payrolls.data.map((employee, index) => (
                <tr key={index} className='border-b'>
                  <th className='p-2.5'>{payrolls.from + index}</th>
                  <td className='p-2.5'>{employee.name}</td>
                  <td className='p-2.5'>{employee.total_hours}</td>
                  <td className='p-2.5'>{employee.earnings}</td>
                  <td className='p-2.5'>{employee.deductions}</td>
                  <td className='p-2.5'>
                    {employee.net_pay < 0 ? 0 : employee.net_pay}
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
    </div>
  )
}

export default PayrollTable
