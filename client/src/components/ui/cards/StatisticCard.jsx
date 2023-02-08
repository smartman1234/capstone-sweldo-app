const StatisticCard = ({ name, value }) => {
  return (
    <div className='bg-white shadow p-5 drop-shadow-xl rounded-lg'>
      <div className='text-xl text-black text-center'>{name}</div>
      <h2 className='text-3xl text-black text-center font-bold'>{value}</h2>
    </div>
  )
}

export default StatisticCard
