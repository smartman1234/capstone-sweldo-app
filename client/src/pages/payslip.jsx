import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import CustomButton from '../components/ui/buttons/CustomButton'

const Payslip = () => {
  const componentRef = useRef()

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
        <div className='h-screen container mx-auto p-5'>
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
                  Payslip for the month of February, 2023
                </h2>
                <h3 className='text-blue-500 text-lg uppercase'>
                  Employee Pay Summary
                </h3>
                <div>
                  <div className='grid grid-cols-2'>
                    <h4>Employee Name</h4>
                    <p>: Jason Lerit</p>
                  </div>
                  <div className='grid grid-cols-2'>
                    <h4>Department</h4>
                    <p>: IT</p>
                  </div>
                  <div className='grid grid-cols-2'>
                    <h4>Job</h4>
                    <p>: Software Engineer</p>
                  </div>
                  <div className='grid grid-cols-2'>
                    <h4>Pay Date</h4>
                    <p>: February 15, 2023</p>
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
              <p>P100,000</p>
            </div>
            <div className='pt-2 grid grid-cols-1 md:grid-cols-2'>
              <h4 className='font-bold'>Gross Earnings</h4>
              <p className='font-bold'>P100,000</p>
            </div>
          </div>
          <hr className='my-4' />
          {/* Deductions */}
          <div className='p-2'>
            <div className='grid grid-cols-1 md:grid-cols-2'>
              <h3 className='text-blue-500 text-lg uppercase'>Deductions</h3>
              <h3 className='text-blue-500 text-lg uppercase'>Amount</h3>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2'>
              <h4>Pagibig</h4>
              <p>P500</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2'>
              <h4>Philhealth</h4>
              <p>P500</p>
            </div>
            <div className='pt-2 grid grid-cols-1 md:grid-cols-2'>
              <h4 className='font-bold'>Total Deductions</h4>
              <p className='font-bold'>P100,000</p>
            </div>
          </div>
          <hr className='my-4' />
          {/* Net pay */}
          <div className='p-2'>
            <div className='bg-blue-100 grid grid-cols-1 md:grid-cols-2'>
              <h4 className='text-lg font-bold'>
                NET PAY (Gross Earnings - Total Deductions)
              </h4>
              <p className='text-lg font-bold'>P100,000</p>
            </div>
          </div>
        </div>
        <div className='h-screen container mx-auto p-5'>
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
                  Payslip for the month of February, 2023
                </h2>
                <h3 className='text-blue-500 text-lg uppercase'>
                  Employee Pay Summary
                </h3>
                <div>
                  <div className='grid grid-cols-2'>
                    <h4>Employee Name</h4>
                    <p>: Jason Lerit</p>
                  </div>
                  <div className='grid grid-cols-2'>
                    <h4>Department</h4>
                    <p>: IT</p>
                  </div>
                  <div className='grid grid-cols-2'>
                    <h4>Job</h4>
                    <p>: Software Engineer</p>
                  </div>
                  <div className='grid grid-cols-2'>
                    <h4>Pay Date</h4>
                    <p>: February 15, 2023</p>
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
              <p>P100,000</p>
            </div>
            <div className='pt-2 grid grid-cols-1 md:grid-cols-2'>
              <h4 className='font-bold'>Gross Earnings</h4>
              <p className='font-bold'>P100,000</p>
            </div>
          </div>
          <hr className='my-4' />
          {/* Deductions */}
          <div className='p-2'>
            <div className='grid grid-cols-1 md:grid-cols-2'>
              <h3 className='text-blue-500 text-lg uppercase'>Deductions</h3>
              <h3 className='text-blue-500 text-lg uppercase'>Amount</h3>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2'>
              <h4>Pagibig</h4>
              <p>P500</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2'>
              <h4>Philhealth</h4>
              <p>P500</p>
            </div>
            <div className='pt-2 grid grid-cols-1 md:grid-cols-2'>
              <h4 className='font-bold'>Total Deductions</h4>
              <p className='font-bold'>P100,000</p>
            </div>
          </div>
          <hr className='my-4' />
          {/* Net pay */}
          <div className='p-2'>
            <div className='bg-blue-100 grid grid-cols-1 md:grid-cols-2'>
              <h4 className='text-lg font-bold'>
                NET PAY (Gross Earnings - Total Deductions)
              </h4>
              <p className='text-lg font-bold'>P100,000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payslip
