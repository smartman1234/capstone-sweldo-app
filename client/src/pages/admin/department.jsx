import { useEffect, useState } from 'react'
import CustomInput from '../../components/ui/inputs/CustomInput'
import PageTitle from '../../components/ui/titles/PageTitle'
import Pagination from '../../components/Pagination'
import * as RestApi from '../../utils/rest_api_util'
import DepartmentTable from '../../components/admin/department/DepartmentTable'
import AddDepartmentForm from '../../components/admin/department/AddDepartmentForm'
import EditDepartmentForm from '../../components/admin/department/EditDepartmentForm'

const Department = () => {
  const [formData, setFormData] = useState({
    name: '',

  })
  const [showAddForm, setShowAddForm] = useState(false)

  const [departments, setDepartments] = useState()
  const [selectedDepartmentId, setSelectedDepartmentId] = useState()

  useEffect(() => {
    getDepartments()
  }, [])

  const getDepartments = async (page = 1) => {
    if (formData.name !== '') {
      searchDepartments(formData.name, page)
      return
    }
    try {
      const result = await RestApi.getDepartments(page)
      const response = await result.json()
      if (result.status === 200) {
        setDepartments(response.departments)
      }
    } catch (error) {}
  }

  const searchDepartments = async (name, page = 1) => {
    try {
      const result = await RestApi.searchDepartments(name, page)
      const response = await result.json()
      if (result.status === 200) {
        setDepartments(response.departments)
      }
    } catch (error) {}
  }

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm)
  }

  return (
    <div>
      <PageTitle title='Department' />
      <div className='space-y-4'>
        <div className='flex space-x-4'>
          <CustomInput
            id='name'
            type='text'
            placeholder='Search for Department'
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value })
              searchDepartments(e.target.value)
            }}
          />
          <button
            className='bg-blue-600 text-white font-medium px-5 py-2.5 rounded hover:bg-blue-700'
            onClick={toggleAddForm}
          >
            Add
          </button>
        </div>
        <DepartmentTable departments={departments} setSelectedDepartmentId={setSelectedDepartmentId} />
        <Pagination pagination={departments} onClick={getDepartments} />
      </div>
      {showAddForm && <AddDepartmentForm toggleAddForm={toggleAddForm} />}
      {selectedDepartmentId !== undefined && (
        <EditDepartmentForm
        selectedDepartmentId={selectedDepartmentId}
          setSelectedDepartmentId={setSelectedDepartmentId}
        />
      )}
    </div>
  )
}

export default Department
