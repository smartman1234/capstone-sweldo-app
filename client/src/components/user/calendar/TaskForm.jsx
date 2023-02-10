import { useEffect, useState } from 'react'
import CustomButton from '../../ui/buttons/CustomButton'
import CustomInput from '../../ui/inputs/CustomInput'
import * as RestApi from '../../../utils/rest_api_util'
import DeleteButton from '../../ui/buttons/DeleteButton'

const TaskForm = ({ selectedDate, setSelectedDate, getMonthlyTasks }) => {
  const [dailyTasks, setDailyTasks] = useState([])

  const [showInput, setShowInput] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    date: selectedDate,
  })
  const [loading, setLoading] = useState(false)
  const [deletingId, setDeletingId] = useState()

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
    setDeletingId(id)
    try {
      const result = await RestApi.deleteTask(id)
      if (result.status === 200) {
        setDailyTasks(dailyTasks.filter((task) => task.id !== id))
        getMonthlyTasks(selectedDate)
      }
    } catch (error) {}
    setDeletingId(undefined)
  }

  return (
    <div className='bg-black/75 fixed top-0 left-0 z-10 w-full h-screen p-5'>
      <div className='w-full h-full flex justify-center items-center'>
        <div className='bg-white w-full lg:w-1/2 rounded flex flex-col p-5'>
          {/* Form title */}
          <div className='flex justify-between'>
            <div className='mb-8'>
              <h1 className='text-3xl font-bold'>Task</h1>
            </div>
            <div>
              <button
                className='font-medium p-2 rounded'
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
                <DeleteButton
                  className='bg-red-600 text-white font-medium p-2 rounded hover:bg-red-500'
                  onClick={() => deleteTask(task.id)}
                  loading={deletingId == task.id}
                ></DeleteButton>
              </div>
            ))}
            {/* Add form */}
            {showInput ? (
              <div className='flex space-x-4'>
                <CustomInput
                  id='name'
                  type='text'
                  placeholder='Task name'
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <CustomButton
                  name={
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
                        d='M12 4.5v15m7.5-7.5h-15'
                      />
                    </svg>
                  }
                  onClick={addTask}
                  loading={loading}
                />
              </div>
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
