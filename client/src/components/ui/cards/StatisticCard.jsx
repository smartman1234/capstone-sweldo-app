const StatisticCard = ({ name, value, svg }) => {
  return (
    <div className='bg-white flex space-x-4 shadow p-5 drop-shadow-xl rounded-lg hover:scale-105 duration-200'>
      <div className='bg-gray-100 p-2 rounded-lg'>{svg}</div>
      <div>
        <div className='font-semibold text-sm text-gray-400 flex justify-between uppercase'>
          {name}
        </div>
        <h2 className='text-3xl text-[#20262E] font-bold'>{value}</h2>
      </div>
    </div>
  )
}

export default StatisticCard
