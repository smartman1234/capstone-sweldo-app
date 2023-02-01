import { useEffect, useState } from 'react'
import CustomInput from '../../components/ui/inputs/CustomInput'
import PageTitle from '../../components/ui/titles/PageTitle'
import Pagination from '../../components/Pagination'
import AddEmployeeForm from '../../components/admin/employee/AddEmployeeForm'
import * as RestApi from '../../utils/rest_api_util'
import EmployeeTable from '../../components/admin/employee/EmployeeTable'

const Employee = () => {
  const [formData, setFormData] = useState({
    name: '',
  })
  const [showAddForm, setShowAddForm] = useState(false)
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

  const searchEmployee = async (name, page = 1) => {
    try {
      const result = await RestApi.searchEmployees(name, page)
      const response = await result.json()
      if (result.status === 200) {
        setEmployees(response.employees)
      }
    } catch (error) {}
  }

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm)
  }

  return (
    <div>
      <PageTitle title='Employee' />
      <div className='space-y-4'>
        <div className='flex space-x-4'>
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
          <button
            className='bg-blue-600 text-white font-medium px-5 py-2.5 rounded hover:bg-blue-700'
            onClick={toggleAddForm}
          >
            Add
          </button>
        </div>
        <EmployeeTable employees={employees} />
        <Pagination pagination={employees} onClick={getEmployees} />
      </div>
      {showAddForm && <AddEmployeeForm toggleAddForm={toggleAddForm} />}
    </div>
  )
}

export default Employee
