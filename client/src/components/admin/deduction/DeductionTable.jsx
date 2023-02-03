import ViewButton from '../../ui/buttons/ViewButton'
import * as RestApi from '../../../utils/rest_api_util'
import DeleteButton from '../../ui/buttons/DeleteButton'

const DeductionTable = ({ deductions, setSelectedDeductionId, getDeductions }) => {
  const handleSubmit = async (id) => {
    try {
      const result = await RestApi.deleteDeduction(id)
      const response = await result.json()
      if (result.status === 200) {
        getDeductions()
      }
      if (result.status === 400) {
      }
    } catch (error) {}
  }

  return (
    <table className='w-full text-left'>
      <thead className='bg-gray-100 uppercase'>
        <tr>
          <th className='p-2.5'>#</th>
          <th className='p-2.5'>Name</th>
          <th className='p-2.5'>Amount</th>
          <th className='p-2.5'>Action</th>
        </tr>
      </thead>
      <tbody>
        {deductions !== undefined &&
          (deductions.data.length !== 0 ? (
            deductions.data.map((deduction, index) => (
              <tr key={index} className='border-b'>
                <th className='p-2.5'>{deductions.from + index}</th>
                <td className='p-2.5'>{deduction.name}</td>
                <td className='p-2.5'>{deduction.amount}</td>
                <td className='p-2.5 space-x-4'>
                  <ViewButton
                    name='View'
                    onClick={() => setSelectedDeductionId(deduction.id)}
                  />
                  <DeleteButton
                    name='Delete'
                    onClick={() => handleSubmit(deduction.id)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='5' className='text-center p-2.5'>
                No data available
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  )
}

export default DeductionTable
