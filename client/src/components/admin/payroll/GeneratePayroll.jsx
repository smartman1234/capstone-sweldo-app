import React from 'react'
import CustomButton from '../../ui/buttons/CustomButton'
import CustomInput from '../../ui/inputs/CustomInput'
import PageTitle from '../../ui/titles/PageTitle'

const GeneratePayroll = () => {
  return (

            <>
        <div className="flex justify-end gap-5">

        <input type='date' />
        <CustomButton name='Generate Payroll'/>
        <CustomButton name='Pay Slip'/>
        </div>
            </>

  )
}

export default GeneratePayroll