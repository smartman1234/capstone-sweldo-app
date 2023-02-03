import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'
import CustomButton from '../components/ui/buttons/CustomButton'
import * as RestApi from '../utils/rest_api_util'

const Payslip = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const componentRef = useRef()

  const [payslips, setPayslips] = useState([])

  useEffect(() => {
    const isAdmin = localStorage.getItem('is_admin')
    const token = localStorage.getItem('token')
    if (!token || !isAdmin) {
      navigate('/')
      return
    }
    if (isAdmin === '0') {
      navigate('/user/dashboard')
      return
    }
    const timestamp = new URLSearchParams(location.search).get('timestamp')
    getPayslips(timestamp)
  }, [location])

  const getPayslips = async (timestamp) => {
    try {
      const result = await RestApi.getPayslips(timestamp)
      const response = await result.json()
      if (result.status === 200) {
        console.log(response.payslips)
        setPayslips(response.payslips)
      }
    } catch (error) {}
  }

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'payslip',
  })

  return (
    <div>
      <div className='container mx-auto pt-5 px-5 md:px-0'>
        <div className='flex justify-end'>
          <CustomButton name='Print' onClick={handlePrint} />
        </div>
      </div>
      <div ref={componentRef}>
        {payslips.map((payslip, key) => (
          <div key={key} className='h-screen container mx-auto p-5'>
            <div className='p-2'>
              <h1 className='text-3xl font-bold'>Sweldo App</h1>
              <p className='font-bold'>Some address here</p>
            </div>
            <hr className='my-4' />
            {/* Employee pay summary */}
            <div className='p-2'>
              <div className='grid grid-cols-1 md:grid-cols-2'>
                <div className='space-y-2'>
                  <h2 className='text-2xl font-bold'>
                    Payslip for the month of{' '}
                    {new Date(payslip.date).toLocaleDateString('default', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </h2>
                  <h3 className='text-blue-500 text-lg uppercase'>
                    Employee Pay Summary
                  </h3>
                  <div>
                    <div className='grid grid-cols-2'>
                      <h4>Employee Name</h4>
                      <p>: {payslip.name}</p>
                    </div>
                    <div className='grid grid-cols-2'>
                      <h4>Department</h4>
                      <p>: {payslip.department}</p>
                    </div>
                    <div className='grid grid-cols-2'>
                      <h4>Job</h4>
                      <p>: {payslip.job}</p>
                    </div>
                    <div className='grid grid-cols-2'>
                      <h4>Pay Date</h4>
                      <p>
                        :{' '}
                        {new Date(payslip.created_at).toLocaleDateString(
                          'default',
                          { month: 'long', day: 'numeric', year: 'numeric' }
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr className='my-4' />
            {/* Earnings */}
            <div className='p-2'>
              <div className='grid grid-cols-1 md:grid-cols-2'>
                <h3 className='text-blue-500 text-lg uppercase'>Earnings</h3>
                <h3 className='text-blue-500 text-lg uppercase'>Amount</h3>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2'>
                <h4>Basic</h4>
                <p>P{payslip.earnings}</p>
              </div>
              <div className='pt-2 grid grid-cols-1 md:grid-cols-2'>
                <h4 className='font-bold'>Gross Earnings</h4>
                <p className='font-bold'>P{payslip.earnings}</p>
              </div>
            </div>
            <hr className='my-4' />
            {/* Deductions */}
            <div className='p-2'>
              <div className='grid grid-cols-1 md:grid-cols-2'>
                <h3 className='text-blue-500 text-lg uppercase'>Deductions</h3>
                <h3 className='text-blue-500 text-lg uppercase'>Amount</h3>
              </div>
              {payslip.deduction_list.map((deduction, deductionKey) => (
                <div
                  key={deductionKey}
                  className='grid grid-cols-1 md:grid-cols-2'
                >
                  <h4>{deduction.name}</h4>
                  <p>P{deduction.amount}</p>
                </div>
              ))}
              <div className='pt-2 grid grid-cols-1 md:grid-cols-2'>
                <h4 className='font-bold'>Total Deductions</h4>
                <p className='font-bold'>P{payslip.total_deductions}</p>
              </div>
            </div>
            <hr className='my-4' />
            {/* Net pay */}
            <div className='p-2'>
              <div className='bg-blue-100 grid grid-cols-1 md:grid-cols-2'>
                <h4 className='text-lg font-bold'>
                  NET PAY (Gross Earnings - Total Deductions)
                </h4>
                <p className='text-lg font-bold'>P{payslip.net_pay < 0 ? 0 : payslip.net_pay}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Payslip
