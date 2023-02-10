import { useEffect, useState } from 'react'
import CustomInput from '../../components/ui/inputs/CustomInput'
import PageTitle from '../../components/ui/titles/PageTitle'
import Pagination from '../../components/Pagination'
import * as RestApi from '../../utils/rest_api_util'
import DepartmentTable from '../../components/admin/department/DepartmentTable'
import AddDepartmentForm from '../../components/admin/department/AddDepartmentForm'
import EditDepartmentForm from '../../components/admin/department/EditDepartmentForm'
import CustomButton from '../../components/ui/buttons/CustomButton'

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
      <div className='space-y-4 bg-white p-5 rounded-lg drop-shadow-xl'>
        <div className='flex space-x-4'>
          <CustomInput
            id='name'
            type='text'
            placeholder='Search for department'
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value })
              searchDepartments(e.target.value)
            }}
          />
          <CustomButton name='Add' onClick={toggleAddForm} />
        </div>
        <DepartmentTable
          departments={departments}
          setSelectedDepartmentId={setSelectedDepartmentId}
          getDepartments={getDepartments}
        />
        <Pagination pagination={departments} onClick={getDepartments} />
      </div>
      {showAddForm && (
        <AddDepartmentForm
          toggleAddForm={toggleAddForm}
          getDepartments={getDepartments}
        />
      )}
      {selectedDepartmentId !== undefined && (
        <EditDepartmentForm
          selectedDepartmentId={selectedDepartmentId}
          setSelectedDepartmentId={setSelectedDepartmentId}
          getDepartments={getDepartments}
        />
      )}
    </div>
  )
}

export default Department
