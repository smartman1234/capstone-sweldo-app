const SalaryTable = ({ salaries }) => {
  return (
    <table className='w-full text-left'>
      <thead className='bg-[#22223b]/80 text-white uppercase rounded-lg'>
        <tr>
          <th className='p-2.5'>#</th>
          <th className='p-2.5'>Date</th>
          <th className='p-2.5'>Total Hours</th>
          <th className='p-2.5'>Earnings</th>
          <th className='p-2.5'>Deduction</th>
          <th className='p-2.5'>Net Pay</th>
        </tr>
      </thead>
      <tbody>
        {salaries !== undefined &&
          (salaries.data.length !== 0 ? (
            salaries.data.map((salary, index) => (
              <tr key={index} className='border-b hover:bg-[#22223b]/40 hover:text-white'>
                <th className='p-2.5'>{salaries.from + index}</th>
                <td className='p-2.5'>
                  {new Date(salary.date).toLocaleDateString('default', {
                    month: 'short',
                    year: 'numeric',
                  })}
                </td>
                <td className='p-2.5'>{salary.total_hours}</td>
                <td className='p-2.5'>{salary.earnings}</td>
                <td className='p-2.5'>{salary.total_deductions}</td>
                <td className='p-2.5'>
                  {salary.net_pay < 0 ? 0 : salary.net_pay}
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

export default SalaryTable
