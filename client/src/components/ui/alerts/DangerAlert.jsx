const DangerAlert = ({ message }) => {
  return (
    message && (
      <div className='bg-red-500 text-sm text-white px-5 py-2.5 rounded'>
        {message}
      </div>
    )
  )
}

export default DangerAlert
