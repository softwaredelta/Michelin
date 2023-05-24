const GradeChart = ({ percent, zone }) => {
  const circumference = 30 * 2 * Math.PI
  // const percent = 50
  // const zone = 'Interior'
  let color

  if (percent < 35) {
    color = 'text-red-700'
  } else if (percent < 50) {
    color = 'text-amber-500'
  } else {
    color = 'text-green-700'
  }

  const content = (
    <>
      <p className='text-lg text-center dark:!text-white'>{zone}</p>
      <div class='flex items-center justify-center m-auto'>
        <svg
          class='w-20 h-20' fill='none'
          fill-opacity='0.0'
        >
          <circle
            class='text-gray-300'
            stroke-width='5'
            stroke='currentColor'
            r='30'
            cx='40'
            cy='40'
          />
          <circle
            class={color}
            stroke-width='5'
            stroke-dasharray={circumference}
            stroke-dashoffset={circumference - (percent / 100) * circumference}
            stroke-linecap='round'
            stroke='currentColor'
            r='30'
            cx='40'
            cy='40'

          />
          <text class={color} x='50%' y='50%' text-anchor='middle' fillOpacity={1.0} fill='currentColor' stroke-width='1px' dy='.3em'>{percent}%</text>
        </svg>

      </div>
    </>
  )
  return content
}

export default GradeChart
