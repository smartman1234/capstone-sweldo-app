const StatisticCard = ({ name, value }) => {
  return (
    <div className='bg-sky-700 shadow p-5'>
      <div className='text-xl text-white text-center'>{name}</div>
      <h2 className='text-3xl text-white text-center font-bold'>{value}</h2>
    </div>
  )
}

export default StatisticCard
