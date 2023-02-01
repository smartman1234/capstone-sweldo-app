import GeneratePayroll from '../../components/admin/payroll/GeneratePayroll'
import PayrollTable from '../../components/admin/payroll/PayrollTable'
import PageTitle from '../../components/ui/titles/PageTitle'

const Payroll = () => {
  return (
    <div>
      <PageTitle title='Payroll' />

      <div className="grid gap-5">

      <GeneratePayroll />
      <PayrollTable />
      </div>
    </div>
  )
}

export default Payroll
