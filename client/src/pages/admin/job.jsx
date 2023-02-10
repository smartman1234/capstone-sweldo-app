import { useEffect, useState } from 'react'
import CustomInput from '../../components/ui/inputs/CustomInput'
import PageTitle from '../../components/ui/titles/PageTitle'
import Pagination from '../../components/Pagination'
import * as RestApi from '../../utils/rest_api_util'
import EditJobForm from '../../components/admin/job/EditJobForm'
import AddJobForm from '../../components/admin/job/AddJobForm'
import JobTable from '../../components/admin/job/JobTable'
import CustomButton from '../../components/ui/buttons/CustomButton'

const Job = () => {
  const [formData, setFormData] = useState({
    name: '',
  })
  const [showAddForm, setShowAddForm] = useState(false)

  const [jobs, setJobs] = useState()
  const [selectedJobId, setSelectedJobId] = useState()

  useEffect(() => {
    getJobs()
  }, [])

  const getJobs = async (page = 1) => {
    if (formData.name !== '') {
      searchJobs(formData.name, page)
      return
    }
    try {
      const result = await RestApi.getJobs(page)
      const response = await result.json()
      if (result.status === 200) {
        setJobs(response.jobs)
      }
    } catch (error) {}
  }

  const searchJobs = async (name, page = 1) => {
    try {
      const result = await RestApi.searchJobs(name, page)
      const response = await result.json()
      if (result.status === 200) {
        setJobs(response.jobs)
      }
    } catch (error) {}
  }

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm)
  }

  return (
    <div>
      <PageTitle title='Job' />
      <div className='space-y-4 bg-white p-5 rounded-lg drop-shadow-xl'>
        <div className='flex space-x-4'>
          <CustomInput
            id='name'
            type='text'
            placeholder='Search for job'
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value })
              searchJobs(e.target.value)
            }}
          />
          <CustomButton name='Add' onClick={toggleAddForm} />
        </div>
        <JobTable
          jobs={jobs}
          setSelectedJobId={setSelectedJobId}
          getJobs={getJobs}
        />
        <Pagination pagination={jobs} onClick={getJobs} />
      </div>
      {showAddForm && (
        <AddJobForm toggleAddForm={toggleAddForm} getJobs={getJobs} />
      )}
      {selectedJobId !== undefined && (
        <EditJobForm
          selectedJobId={selectedJobId}
          setSelectedJobId={setSelectedJobId}
          getJobs={getJobs}
        />
      )}
    </div>
  )
}

export default Job
