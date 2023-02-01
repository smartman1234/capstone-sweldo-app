import { useEffect, useState } from 'react'
import ActionButton from '../../components/ui/buttons/ActionButton'
import CustomInput from '../../components/ui/inputs/CustomInput'
import PageTitle from '../../components/ui/titles/PageTitle'
import Pagination from '../../components/Pagination'
import * as RestApi from '../../utils/rest_api_util'

const Employee = () => {
  const [formData, setFormData] = useState({
    name: '',
  })
  const [loading, setLoading] = useState(false)

  const [employees, setEmployees] = useState()

  useEffect(() => {
    getEmployees()
  }, [])

  const getEmployees = async (page = 1) => {
    if (formData.name !== '') {
      searchEmployee(formData.name, page)
      return
    }
    try {
      const result = await RestApi.getEmployees(page)
      const response = await result.json()
      if (result.status === 200) {
        setEmployees(response.employees)
      }
    } catch (error) {}
  }

  const searchEmployee = async (name, page = 1) => {}

  const viewEmployee = async (id) => {}

  return (
    <div>
      <PageTitle title='Employee' />
      <div className='space-y-4'>
        <CustomInput
          id='name'
          type='text'
          placeholder='Search for employee name or email'
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value })
            searchEmployee(e.target.value)
          }}
        />
        <table className='w-full text-left'>
          <thead className='bg-gray-100 uppercase'>
            <tr>
              <th className='p-2.5'>#</th>
              <th className='p-2.5'>Email</th>
              <th className='p-2.5'>First Name</th>
              <th className='p-2.5'>Last Name</th>
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
                    <td className='p-2.5'>{employee.first_name}</td>
                    <td className='p-2.5'>{employee.last_name}</td>
                    <td className='p-2.5'>Department</td>
                    <td className='p-2.5'>Job</td>
                    <td className='p-2.5 space-x-4'>
                      <ActionButton
                        name='View'
                        onClick={() => viewEmployee(employee.id)}
                        loading={loading}
                      />
                    </td>
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
        <Pagination pagination={employees} onClick={getEmployees} />
      </div>
    </div>
  )
}

export default Employee
