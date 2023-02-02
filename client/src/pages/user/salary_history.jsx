import { useState } from 'react'
import Pagination from '../../components/Pagination'
import PageTitle from '../../components/ui/titles/PageTitle'
import SalaryTable from '../../components/user/salary_history/SalaryTable'

const SalaryHistory = () => {
  const [salaries, setSalaries] = useState()

  const getSalaries = async () => {

  }

  return (
    <div>
      <PageTitle title='Salary History' />
      <div className='space-y-4'>
        <SalaryTable salaries={salaries} />
        <Pagination pagination={salaries} onClick={getSalaries} />
      </div>
    </div>
  )
}

export default SalaryHistory
