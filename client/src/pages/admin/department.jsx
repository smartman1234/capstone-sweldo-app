import ListDepartment from "../../components/admin/department/ListDepartment"
import CreateDepartment from "../../components/admin/department/CreateDepartment"
import SearchDepartment from "../../components/admin/department/SearchDepartment"
import PaginationDepartment from "../../components/admin/department/PaginationDepartment"

const Department = () => {
  return (<div>
    <CreateDepartment/>
    <SearchDepartment/>
    <ListDepartment/>
    <PaginationDepartment/>
   </div>
 ) 

}

export default Department
