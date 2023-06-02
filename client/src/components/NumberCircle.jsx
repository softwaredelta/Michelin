const NumberCircle = ({ countContent }) => {
  const content = (
    <>
      <div className='absolute 2xl:mr-24 lg:mr-3 self-center bottom-20 right-11 z-20 rounded-xl border-2 px-5'>
        <div className='text-center text-white font-semibold pt-5 text-xl'>
          Número de Auditorías Realizadas
        </div>
        <div class='flex items-center justify-center m-auto'>
          <svg class='w-auto h-auto' fill='none' fill-opacity='0.0'>
            <circle
              class='text-white'
              stroke-width='5'
              stroke='currentColor'
              r='50'
              cx='50%'
              cy='50%'
            />
            <text
              class='text-3xl text-white'
              x='50%'
              y='50%'
              text-anchor='middle'
              fillOpacity={1.0}
              fill='currentColor'
              stroke-width='6px'
              dy='.3em'
            >
              {countContent}
            </text>
          </svg>
        </div>
      </div>
    </>
  )
  return content
}
export default NumberCircle
