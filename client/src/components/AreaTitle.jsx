const AreaTitle = ({ number, title, questions }) => {
  const content = (
    <>
      <div class='flex flex-row justify-center'>
        <div class='col my-2 justify-center'>
          <h1 className='text-blues-200 text-3xl text-center ml-10'>{number}</h1>
        </div>
        <div class='col my-2 justify-center'>
          <h1 className='text-blues-200 text-3xl text-center ml-10'> {title} </h1>
        </div>
        <div class='col my-2 justify-center'>
          <h1 className='text-blues-200 text-3xl text-center ml-10'> 0/{questions} </h1>
        </div>

      </div>
    </>
  )
  return content
}
export default AreaTitle
