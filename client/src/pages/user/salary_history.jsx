import { useEffect, useState } from 'react'
import PageTitle from '../../components/ui/titles/PageTitle'
import SalaryTable from '../../components/user/salary_history/SalaryTable'
import * as RestApi from '../../utils/rest_api_util'

const SalaryHistory = () => {
  const [salaries, setSalaries] = useState()

  useEffect(() => {
    getSalaries()
  }, [])

  const getSalaries = async () => {
    try {
      const result = await RestApi.getSalaryHistory()
      const response = await result.json()
      if (result.status === 200) {
        setSalaries(response.salaryHistory)
      }
    } catch (error) {}
  }

  return (
    <div>
      <PageTitle title='Salary History' />
      <div className='space-y-4'>
        <SalaryTable salaries={salaries} />
      </div>
    </div>
  )
}

export default SalaryHistory
