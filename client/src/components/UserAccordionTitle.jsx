const UserAccordionTitle = ({ role, name, zone, reports, manager }) => {
  return (
    <>
      <div className='flex flex-row self-center'>
        <div className='flex flex-col mx-14 text-lg'> {role} </div>
        <div className='flex flex-col mx-14 text-lg'> {name} </div>
        <div className='flex flex-col mx-14 text-lg'> {zone} </div>
        <div className='flex flex-col mx-14 text-lg'> {reports} </div>
        <div className='flex flex-col mx-14 text-lg'> {manager} </div>
      </div>
    </>
  )
}

export default UserAccordionTitle
