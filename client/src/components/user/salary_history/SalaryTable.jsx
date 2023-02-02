const SalaryTable = ({ salaries, getSalaries }) => {
  return (
    <table className='w-full text-left'>
      <thead className='bg-gray-100 uppercase'>
        <tr>
          <th className='p-2.5'>#</th>
          <th className='p-2.5'>Date</th>
          <th className='p-2.5'>Total Hours</th>
          <th className='p-2.5'>Deduction</th>
          <th className='p-2.5'>Earning</th>
        </tr>
      </thead>
      <tbody>
        {salaries !== undefined &&
          (salaries.data.length !== 0 ? (
            salaries.data.map((salary, index) => (
              <tr key={index} className='border-b'>
                <th className='p-2.5'>{salaries.from + index}</th>
                <td className='p-2.5'>{salary.date}</td>
                <td className='p-2.5'>{salary.totalHours}</td>
                <td className='p-2.5'>{salary.deduction}</td>
                <td className='p-2.5'>{salary.earning}</td>                
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

export default SalaryTable
