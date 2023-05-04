const UserAccordionTitle = ({ role, name, zone, reports, manager }) => {
  return (
    <>
      <div className="flex flex-row">
        <div className='grid grid-cols-5 gap-20 w-full'>
          <div className='text text-center w-28 break-words'> {role} </div>
          <div className='text text-center w-28 break-words'> {name} </div>
          <div className='text text-center w-28 break-words'> {zone} </div>
          <div className='text text-center w-28 break-words'> {reports} </div>
          <div className='text text-center w-28 break-words mr-10'> {manager} </div>
        </div>
      </div>
    </>
  )
}

export default UserAccordionTitle
