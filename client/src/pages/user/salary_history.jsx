import { useEffect, useState } from 'react'
import PageTitle from '../../components/ui/titles/PageTitle'
import SalaryTable from '../../components/user/salary_history/SalaryTable'
import Pagination from '../../components/Pagination'
import * as RestApi from '../../utils/rest_api_util'

const SalaryHistory = () => {
  const [salaries, setSalaries] = useState()

  useEffect(() => {
    getSalaries()
  }, [])

  const getSalaries = async (page = 1) => {
    try {
      const result = await RestApi.getSalaryHistory(page)
      const response = await result.json()
      if (result.status === 200) {
        setSalaries(response.salaryHistory)
      }
    } catch (error) {}
  }

  return (
    <div>
      <PageTitle title='Salary History' />
      <div className='space-y-4 bg-white p-5 rounded-lg drop-shadow-xl'>
        <SalaryTable salaries={salaries} />
        <Pagination pagination={salaries} onClick={getSalaries} />
      </div>
    </div>
  )
}

export default SalaryHistory
