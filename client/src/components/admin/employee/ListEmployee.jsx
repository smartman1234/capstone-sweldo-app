import { useEffect } from 'react'
import { useState } from 'react'
import * as RestApi from '../../../utils/rest_api_util'

const ListEmployee = () => {
  const [listEmployee, setListEmployee] = useState()

  useEffect(() => {
    getEmployee()
  }, [])

  const getEmployee = async () => {
    try {
      const result = await RestApi.getEmployee()
      const response = await result.json()
      if (result.status === 200) {
        setListEmployee(response.listEmployee)
      }
    } catch (error) {}
  }
  return (
    <div className=''>
      <table className='w-full text-left'>
        <thead className='bg-gray-100 uppercase'>
          <tr>
            <th className='p-2.5'>#</th>
            <th className='p-2.5'>First Name</th>
            <th className='p-2.5'>Last Name</th>
            <th className='p-2.5'>Email</th>
            <th className='p-2.5'>Birthdate</th>
            <th className='p-2.5'>Gender</th>
            <th className='p-2.5'>Address</th>
            <th className='p-2.5'>Phone</th>
          </tr>
        </thead>
        <tbody>
          {listEmployee !== undefined &&
            (listEmployee.data.length !== 0 ? (
              listEmployee.data.map((employee, index) => (
                <tr key={index} className='border-b'>
                  <th className='p-2.5'>{listEmployee.from + index}</th>
                  <td className='p-2.5'>{employee.first_name}</td>
                  <td className='p-2.5'>{employee.last_name}</td>
                  <td className='p-2.5'>{employee.email}</td>
                  <td className='p-2.5'>{employee.birthday}</td>
                  <td className='p-2.5'>{employee.gender}</td>
                  <td className='p-2.5'>{employee.address}</td>
                  <td className='p-2.5'>{employee.phone}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='5' className='text-center p-2.5'>
                  0 Employee
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default ListEmployee
