import ActionButton from '../../ui/buttons/ActionButton'

const EmployeeTable = ({ employees, setSelectedEmployeeId }) => {
  return (
    <table className='w-full text-left'>
      <thead className='bg-gray-100 uppercase'>
        <tr>
          <th className='p-2.5'>#</th>
          <th className='p-2.5'>Email</th>
          <th className='p-2.5'>Name</th>
          <th className='p-2.5'>Department</th>
          <th className='p-2.5'>Job</th>
          <th className='p-2.5'>Action</th>
        </tr>
      </thead>
      <tbody>
        {employees !== undefined &&
          (employees.data.length !== 0 ? (
            employees.data.map((employee, index) => (
              <tr key={index} className='border-b'>
                <th className='p-2.5'>{employees.from + index}</th>
                <td className='p-2.5'>{employee.email}</td>
                <td className='p-2.5'>{employee.first_name} {employee.last_name}</td>
                <td className='p-2.5'>{employee.department === null ? 'None' : employee.department.name}</td>
                <td className='p-2.5'>{employee.job === null ? 'None' : employee.job.name }</td>
                <td className='p-2.5 space-x-4'>
                  <ActionButton
                    name='View'
                    onClick={() => setSelectedEmployeeId(employee.id)}
                  />
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
  )
}

export default EmployeeTable
