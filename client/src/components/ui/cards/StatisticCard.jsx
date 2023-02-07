const StatisticCard = ({ name, value }) => {
  return (
    <div className='bg-white shadow p-5'>
      <div className='text-xl text-center'>{name}</div>
      <h2 className='text-3xl text-center font-bold'>{value}</h2>
    </div>
  )
}

export default StatisticCard
