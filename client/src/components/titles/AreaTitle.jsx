const AreaTitle = ({ number, title }) => {
  const content = (
    <>
      <div class='flex flex-row w-full dark:!bg-white self-center my-4'>
        <div class='ml-6'>
          <h1 className='text-blues-200 text-3xl font-semibold'> {title} </h1>
        </div>
      </div>
    </>
    // <>
    //   <div class="grid grid-cols-6 w-80 dark:!bg-white self-center">
    //     <div class="col-span-1 self-center">
    //       <h1 className="text-blues-200 text-2xl font-semibold">{number}</h1>
    //     </div>
    //     <div class="col-span-4">
    //       <h1 className="text-blues-200 text-2xl font-semibold"> {title} </h1>
    //     </div>
    //     <div class='col-span-1 ml-3 self-center'>
    //       <h1 className='text-blues-200 text-2xl'> {answered}/{questions} </h1>
    //     </div>
    //   </div>
    // </>
  )
  return content
}
export default AreaTitle
