import AddEmployee from '../../components/admin/employee/AddEmployee'
import ListEmployee from '../../components/admin/employee/ListEmployee'
import Pagination from '../../components/admin/employee/Pagination'
import SearchEmployee from '../../components/admin/employee/SearchEmployee'

const Employee = () => {
  return (
    <div>
      <AddEmployee />
      <SearchEmployee />
      <ListEmployee />
      <Pagination />
    </div>
  )
}

export default Employee
