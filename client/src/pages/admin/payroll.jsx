import GeneratePayroll from '../../components/admin/payroll/GeneratePayroll'
import PayrollTable from '../../components/admin/payroll/PayrollTable'
import PageTitle from '../../components/ui/titles/PageTitle'

const Payroll = () => {
  return (
    <div>
      <PageTitle title='Payroll' />
      <GeneratePayroll />
      <PayrollTable />
    </div>
  )
}

export default Payroll
