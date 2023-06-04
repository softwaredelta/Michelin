const AreaTitle = ({ number, title, questions, answered }) => {
  const content = (
    <>
      <div class='grid grid-cols-6 w-96 dark:!bg-white'>
        <div class='col-span-1 self-center'>
          <h1 className='text-blues-200 text-3xl'>{number}</h1>
        </div>
        <div class='col-span-4'>
          <h1 className='text-blues-200 text-3xl'> {title} </h1>
        </div>
        <div class='col-span-1 ml-3 self-center'>
          <h1 className='text-blues-200 text-3xl'> {answered}/{questions} </h1>
        </div>
      </div>
    </>
  )
  return content
}
export default AreaTitle
