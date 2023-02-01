const CustomInput = ({
  label,
  id,
  type,
  placeholder,
  value,
  onChange,
  error,
  disabled = false
}) => {
  return (
    <div className='w-full'>
      {label !== undefined && (
        <label
          htmlFor={id}
          className='block text-gray-700 text-sm font-medium mb-2'
        >
          {label}
        </label>
      )}
      <input
        className={
          error
            ? 'w-full text-gray px-5 py-2.5 rounded border border-red-500'
            : 'w-full text-gray px-5 py-2.5 rounded border'
        }
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {error && <span className='text-sm text-red-500'>{error}</span>}
    </div>
  )
}

export default CustomInput
