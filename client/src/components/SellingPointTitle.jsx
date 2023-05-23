const UserAccordionTitle = ({ name, zone, date }) => {
  const content = (
    <>
      <div className='flex flex-row mr-7'>
        <div className='grid grid-cols-3 gap-64 w-full'>
          <div className='text text-center w-28 break-words'> {name} </div>
          <div className='text text-center w-28 break-words'> {zone} </div>
          <div className='text text-center w-28 break-words'> {date} </div>
        </div>
      </div>

    </>
  )
  return content
}

export default UserAccordionTitle
