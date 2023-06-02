const AreaTitle = ({ number, title, questions, answered }) => {
  const content = (
    <>
      <div class='grid grid-cols-3 w-full'>
        <div class='col '>
          <h1 className='text-blues-200 text-3xl'>{number}</h1>
        </div>
        <div class='col w-5/6'>
          <h1 className='text-blues-200 text-3xl'> {title} </h1>
        </div>
        <div class='col '>
          <h1 className='text-blues-200 text-3xl'> {answered}/{questions} </h1>
        </div>

      </div>
    </>
  )
  return content
}
export default AreaTitle
