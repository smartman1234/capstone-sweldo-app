import { useState } from 'react'
import PayrollTable from '../../components/admin/payroll/PayrollTable'
import CustomButton from '../../components/ui/buttons/CustomButton'
import CustomInput from '../../components/ui/inputs/CustomInput'
import PageTitle from '../../components/ui/titles/PageTitle'

const Payroll = () => {
  const [formData, setFormData] = useState({
    month: '',
  })

  return (
    <div>
      <PageTitle title='Payroll' />
      <div className='space-y-4'>
        <div className='flex justify-end space-x-4'>
          <div>
            <CustomInput
              id='month'
              type='month'
              value={formData.month}
              onChange={(e) => {
                setFormData({ ...formData, month: e.target.value })
                // TODO: Filter payrolls
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
        <PayrollTable />
      </div>
    </div>
  )
}

export default Payroll
