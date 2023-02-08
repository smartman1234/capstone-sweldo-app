import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PayrollTable from '../../components/admin/payroll/PayrollTable'
import CustomButton from '../../components/ui/buttons/CustomButton'
import CustomInput from '../../components/ui/inputs/CustomInput'
import PageTitle from '../../components/ui/titles/PageTitle'
import Pagination from '../../components/Pagination'
import * as RestApi from '../../utils/rest_api_util'

const Payroll = () => {
  const navigate = useNavigate()

  const [month, setMonth] = useState(0)

  const [payrolls, setPayrolls] = useState()
  const [loading, setLoading] = useState()

  useEffect(() => {
    const date = new Date()
    const year = date.getFullYear()
    let month = date.getMonth() + 1
    if (month.toString().length < 2) {
      month = '0' + month
    }
    setMonth(`${year}-${month}`)
    getPayrolls(1, `${year}-${month}`)
  }, [])

  const getPayrolls = async (page = 1, selectedDate = null) => {
    try {
      let timestamp = Date.parse(month) / 1000
      if (selectedDate !== null) {
        timestamp = Date.parse(selectedDate) / 1000
      }
      const result = await RestApi.getPayrolls(timestamp, page)
      const response = await result.json()
      if (result.status === 200) {
        setPayrolls(response.payrolls)
      }
    } catch (error) {}
  }

  const generatePayslips = async () => {
    setLoading(true)
    try {
      const timestamp = Date.parse(month) / 1000
      const result = await RestApi.generatePayslips(timestamp)
      const response = await result.json()
      if (result.status === 200) {
        navigate('/payslip?timestamp=' + timestamp)
      }
    } catch (error) {}
    setLoading(false)
  }

  return (
    <div>
      <PageTitle title='Payroll' />
      <div className='space-y-4 bg-white p-5 rounded-lg drop-shadow-xl'>
        <div className='flex justify-end space-x-4'>
          <div>
            <CustomInput
              id='month'
              type='month'
              value={month}
              onChange={(e) => {
                setMonth(e.target.value)
                getPayrolls(1, e.target.value)
              }}
            />
          </div>
          <CustomButton
            name='Generate Payslip'
            onClick={generatePayslips}
            loading={loading}
          />
        </div>
        <PayrollTable payrolls={payrolls} />
        <Pagination pagination={payrolls} onClick={getPayrolls} />
      </div>
    </div>
  )
}

export default Payroll
