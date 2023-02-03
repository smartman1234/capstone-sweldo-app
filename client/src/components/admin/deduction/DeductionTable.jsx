import ActionButton from '../../ui/buttons/ActionButton'
import * as RestApi from '../../../utils/rest_api_util'

const DeductionTable = ({ deductions, setSelectedDeductionId }) => {

  // Delete deduction
  const handleSubmit = async (id) => {
    try {
      const result = await RestApi.deleteDeduction(id)
      const response = await result.json()

      if (result.status === 200) {
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
                  <ActionButton
                    name='View'
                    onClick={() => setSelectedDeductionId(deduction.id)}
                  />
                  <ActionButton
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
