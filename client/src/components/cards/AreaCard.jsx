import AreaTitle from '../titles/AreaTitle'

const AreaCard = ({
  areaTitle,
  index,
  questionContent
}) => {
  const content = (
    <>
      <div className='self-center m-auto'>
        <AreaTitle number={index + 1} title={areaTitle} />
      </div>
      <div className='p-4'>{questionContent}</div>
    </>
  )
  return content
}

export default AreaCard
