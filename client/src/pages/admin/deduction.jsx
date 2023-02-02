import { useEffect, useState } from 'react'
import CustomInput from '../../components/ui/inputs/CustomInput'
import PageTitle from '../../components/ui/titles/PageTitle'
import Pagination from '../../components/Pagination'
import * as RestApi from '../../utils/rest_api_util'
import DeductionTable from '../../components/admin/deduction/DeductionTable'
import AddDeductionForm from '../../components/admin/deduction/AddDeductionForm'
import EditDeductionForm from '../../components/admin/deduction/EditDeductionForm'

const Deduction = () => {
  const [formData, setFormData] = useState({
    name: '',
  })
  const [showAddForm, setShowAddForm] = useState(false)

  const [deductions, setDeductions] = useState()
  const [selectedDeductionId, setSelectedDeductionId] = useState()

  useEffect(() => {
    getDeductions()
  }, [])

  const getDeductions = async (page = 1) => {
    if (formData.name !== '') {
      searchDeductions(formData.name, page)
      return
    }
    try {
      const result = await RestApi.getDeductions(page)
      const response = await result.json()
      if (result.status === 200) {
        setDeductions(response.deductions)
      }
    } catch (error) {}
  }

  const searchDeductions = async (name, page = 1) => {
    try {
      const result = await RestApi.searchDeductions(name, page)
      const response = await result.json()
      if (result.status === 200) {
        setDeductions(response.deductions)
      }
    } catch (error) {}
  }

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm)
  }

  return (
    <div>
      <PageTitle title='Deduction' />
      <div className='space-y-4'>
        <div className='flex space-x-4'>
          <CustomInput
            id='name'
            type='text'
            placeholder='Search for deduction'
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value })
              searchDeductions(e.target.value)
            }}
          />
          <button
            className='bg-blue-600 text-white font-medium px-5 py-2.5 rounded hover:bg-blue-700'
            onClick={toggleAddForm}
          >
            Add
          </button>
        </div>
        <DeductionTable
          deductions={deductions}
          setSelectedDeductionId={setSelectedDeductionId}
        />
        <Pagination pagination={deductions} onClick={getDeductions} />
      </div>
      {showAddForm && <AddDeductionForm toggleAddForm={toggleAddForm} />}
      {selectedDeductionId !== undefined && (
        <EditDeductionForm
          selectedDeductionId={selectedDeductionId}
          setSelectedDeductionId={setSelectedDeductionId}
        />
      )}
    </div>
  )
}

export default Deduction
