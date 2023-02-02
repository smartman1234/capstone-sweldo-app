const StatisticCard = ({ name, value }) => {
  return (
    <div className='bg-white shadow p-5'>
      <div>{name}</div>
      <h2 className='text-3xl font-bold'>{value}</h2>
    </div>
  )
}

export default StatisticCard
