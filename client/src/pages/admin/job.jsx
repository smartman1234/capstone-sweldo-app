import AddJobTitle from '../../components/admin/job/AddJobTitle'
import ListJobTitle from '../../components/admin/job/ListJobTitle'
import PaginationJobTitle from '../../components/admin/job/PaginationJobTitle'
import SearchJobTitle from '../../components/admin/job/SearchJobTitle'

const Job = () => {
  return (
    <div className='grid grid-cols-1 gap-5'>
      <AddJobTitle />
      <SearchJobTitle />
      <ListJobTitle />
      <PaginationJobTitle />
    </div>
  )
}

export default Job
