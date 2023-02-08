import { useEffect, useState } from 'react'
import CustomButton from '../../ui/buttons/CustomButton'
import CustomInput from '../../ui/inputs/CustomInput'
import * as RestApi from '../../../utils/rest_api_util'

const TaskForm = ({ selectedDate, setSelectedDate, getMonthlyTasks }) => {
  const [dailyTasks, setDailyTasks] = useState([])

  const [showInput, setShowInput] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    date: selectedDate,
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getDailyTasks()
  }, [])

  const getDailyTasks = async () => {
    try {
      const result = await RestApi.getDailyTasks(selectedDate)
      const response = await result.json()
      if (result.status === 200) {
        setDailyTasks(response.tasks)
      }
    } catch (error) {}
  }

  const addTask = async () => {
    setLoading(true)
    try {
      const result = await RestApi.addTask(formData)
      const response = await result.json()
      if (result.status === 200) {
        setFormData((prevData) => {
          return {
            ...prevData,
            name: '',
          }
        })
        setDailyTasks((prevData) => [...prevData, response.task])
        getMonthlyTasks(selectedDate)
      }
    } catch (error) {}
    setLoading(false)
    setShowInput(false)
  }

  const deleteTask = async (id) => {
    try {
      const result = await RestApi.deleteTask(id)
      if (result.status === 200) {
        setDailyTasks(dailyTasks.filter((task) => task.id !== id))
        getMonthlyTasks(selectedDate)
      }
    } catch (error) {}
  }

  return (
    <div className='bg-black/75 fixed top-0 left-0 z-10 w-full h-screen p-5'>
      <div className='w-full h-full flex justify-center items-center'>
        <div className='bg-white w-full lg:w-1/2 rounded flex flex-col p-5'>
          {/* Form title */}
          <div className='flex justify-between'>
            <div className='mb-4'>
              <h1 className='text-3xl font-bold'>Task</h1>
            </div>
            <div>
              <button
                className='bg-blue-600 text-white font-medium p-2 rounded hover:bg-blue-500'
                onClick={() => setSelectedDate(undefined)}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>
          </div>
          {/* Form */}
          <div className='space-y-4 h-96 overflow-auto pr-5'>
            {/* Task list */}
            {dailyTasks.map((task) => (
              <div
                key={task.id}
                className='flex justify-between items-center hover:bg-blue-100 rounded pl-2'
              >
                {task.name}
                <button
                  className='bg-red-600 text-white font-medium p-2 rounded hover:bg-red-500'
                  onClick={() => deleteTask(task.id)}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                    />
                  </svg>
                </button>
              </div>
            ))}
            {/* Add form */}
            {showInput ? (
              <>
                <CustomInput
                  id='name'
                  type='text'
                  placeholder='Task name'
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <CustomButton name='Add' onClick={addTask} loading={loading} />
              </>
            ) : (
              <CustomButton
                name='Add a task'
                onClick={() => setShowInput(true)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskForm
