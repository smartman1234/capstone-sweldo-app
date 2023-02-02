import { useEffect, useState } from 'react'
import PayrollTable from '../../components/admin/payroll/PayrollTable'
import CustomButton from '../../components/ui/buttons/CustomButton'
import CustomInput from '../../components/ui/inputs/CustomInput'
import PageTitle from '../../components/ui/titles/PageTitle'
import * as RestApi from '../../utils/rest_api_util'

const Payroll = () => {

  const [month, setMonth] = useState(0)

  const [payrolls, setPayrolls] = useState()

  useEffect(() => {
    const date = new Date()
    const year = date.getFullYear()
    let month = date.getMonth() + 1
    if (month.toString().length < 2) {
      month = '0' + month
    }
    setMonth(`${year}-${month}`)
    getPayrolls(Date.parse(date) / 1000)
  }, [])

  const getPayrolls = async (date, page = 1) => {
    try {
      const result = await RestApi.getPayrolls(date, page)
      const response = await result.json()
      if (result.status === 200) {
        setPayrolls(response.payrolls)
      }
    } catch (error) {}
  }

  return (
    <div>
      <PageTitle title='Payroll' />
      <div className='space-y-4'>
        <div className='flex justify-end space-x-4'>
          <div>
            <CustomInput
              id='month'
              type='month'
              value={month}
              onChange={(e) => {
                setMonth(e.target.value)
                getPayrolls(Date.parse(e.target.value) / 1000)
              }}
            />
          </div>
          <CustomButton
            name='Generate Payroll'
            onClick={() => {}}
            loading={false}
          />
          <CustomButton
            name='Generate Payslip'
            onClick={() => {}}
            loading={false}
          />
        </div>
        <PayrollTable payrolls={payrolls} />
      </div>
    </div>
  )
}

export default Payroll
