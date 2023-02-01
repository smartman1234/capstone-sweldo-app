import { useState } from 'react'
import CustomInput from '../../ui/inputs/CustomInput'

const SearchEmployee = () => {
  const [formData, setFormData] = useState({
    name: '',
  })
  return (
    <div className=''>
      <CustomInput
        id='name'
        type='text'
        placeholder='Search for employee name'
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
    </div>
  )
}

export default SearchEmployee
