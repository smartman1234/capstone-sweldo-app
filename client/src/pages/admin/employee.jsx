import AddEmployee from '../../components/admin/employee/AddEmployee'
import ListEmployee from '../../components/admin/employee/ListEmployee'
import PaginationEmployee from '../../components/admin/employee/PaginationEmployee'
import SearchEmployee from '../../components/admin/employee/SearchEmployee'

const Employee = () => {
  return (
    <div className='grid grid-cols-1 gap-5'>
      <AddEmployee />
      <SearchEmployee />
      <ListEmployee />
      <PaginationEmployee />
    </div>
  )
}

export default Employee
