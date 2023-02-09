import { useEffect, useState } from 'react'
import CustomInput from '../../components/ui/inputs/CustomInput'
import PageTitle from '../../components/ui/titles/PageTitle'
import Pagination from '../../components/Pagination'
import AddEmployeeForm from '../../components/admin/employee/AddEmployeeForm'
import * as RestApi from '../../utils/rest_api_util'
import EmployeeTable from '../../components/admin/employee/EmployeeTable'
import EditEmployeeForm from '../../components/admin/employee/EditEmployeeForm'

const Employee = () => {
  const [formData, setFormData] = useState({
    name: '',
  })
  const [showAddForm, setShowAddForm] = useState(false)

  const [employees, setEmployees] = useState()
  const [selectedEmployeeId, setSelectedEmployeeId] = useState()

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
      <div className='space-y-4 bg-white p-5 rounded-lg drop-shadow-xl'>
        <div className='flex space-x-4'>
          <CustomInput
            id='name'
            type='text'
            placeholder='Search for employee email or name'
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value })
              searchEmployee(e.target.value)
            }}
          />
          <button
            className='bg-indigo-400 text-white font-medium px-5 py-2.5 rounded-full hover:bg-indigo-700 w-24'
            onClick={toggleAddForm}
          >
            Add
          </button>
        </div>
        <EmployeeTable
          employees={employees}
          setSelectedEmployeeId={setSelectedEmployeeId}
          getEmployees={getEmployees}
        />
        <Pagination pagination={employees} onClick={getEmployees} />
      </div>
      {showAddForm && (
        <AddEmployeeForm
          toggleAddForm={toggleAddForm}
          getEmployees={getEmployees}
        />
      )}
      {selectedEmployeeId !== undefined && (
        <EditEmployeeForm
          selectedEmployeeId={selectedEmployeeId}
          setSelectedEmployeeId={setSelectedEmployeeId}
          getEmployees={getEmployees}
        />
      )}
    </div>
  )
}

export default Employee
