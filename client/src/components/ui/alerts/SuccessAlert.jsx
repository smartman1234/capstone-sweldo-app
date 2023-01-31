const SuccessAlert = ({ message }) => {
  return (
    message && (
      <div className='bg-green-500 text-sm text-white px-5 py-2.5 rounded'>
        {message}
      </div>
    )
  )
}

export default SuccessAlert
