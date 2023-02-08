const StatisticCard = ({ name, value }) => {
  return (
    <div className='bg-white shadow p-5 drop-shadow-xl rounded-lg hover:scale-105 duration-200'>
      <div className='font-bold text-gray-700 text-center uppercase'>{name}</div>
      <h2 className='text-3xl text-black text-center font-bold'>{value}</h2>
    </div>
  )
}

export default StatisticCard
