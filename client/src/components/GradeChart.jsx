const GradeChart = () => {
  const circumference = 30 * 2 * Math.PI
  const percent = 50
  const zone = 'Interior'

  const content = (
    <>
      <p class='text-l text-center'>{zone}</p>
      <div class='flex items-center justify-center m-auto'>
        <svg class='w-20 h-20'>
          <circle
            class='text-gray-300'
            stroke-width='5'
            stroke='currentColor'
            fill='transparent'
            r='30'
            cx='40'
            cy='40'
          />
          <circle
            class='text-blue-600'
            stroke-width='5'
            stroke-dasharray={circumference}
            stroke-dashoffset={circumference - (percent / 100) * circumference}
            stroke-linecap='round'
            stroke='currentColor'
            fill='transparent'
            r='30'
            cx='40'
            cy='40'
          />
        </svg>
        <span class='absolute text-xl text-blue-700'>{percent}%</span>
      </div>
    </>
  )
  return content
}

export default GradeChart
