const VisualKey = ({ method, myName }) => {
  const content = (
    <>
      <button onClick={method} className='w-10'>
        <div>
          <svg class='w-10 h-10' fill='white' fill-opacity='1.0'>
            <circle
              class='text-blues-150'
              stroke-width='5'
              stroke='currentColor'
              r='18'
              cx='20'
              cy='20'
            />
            <text
              className='text-xl font-semibold text-blues-150'
              x='50%'
              y='50%'
              text-anchor='middle'
              fillOpacity={1.0}
              fill='currentColor'
              stroke-width='100%'
              dy='.3em'
            >
              {myName}
            </text>
          </svg>
        </div>
      </button>
    </>
  )
  return content
}
export default VisualKey
