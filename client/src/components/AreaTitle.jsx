const AreaTitle = ({number, title}) => {
  const content = (
    <>
      <div class='flex flex-row justify-center'>
        <div class='flex-col'>
          <h1 className='text-blues-200 text-3xl'>{number}</h1>
        </div>
        <div class='col my-2 justify-center'>
          <h1 className='text-blues-200 text-3xl text-center ml-10'> {title} </h1>
        </div>
      </div>
    </>
  )
  return content
}
export default AreaTitle
