const UserAccordionTitle = ({ idUser, role, name, zone, reports, manager }) => {
  const content = (
    <>
      <div className='flex flex-row'>
        <div className='grid grid-cols-5 2xl:gap-20 lg:gap-10 w-full'>
          <div className='text text-center w-28 break-words dark:text-white'>
            {role}
          </div>
          <div className='text text-center w-28 break-words dark:text-white'>
            {name}
          </div>
          <div className='text text-center w-28 break-words dark:text-white'>
            {zone}
          </div>
          <div className='text text-center w-28 break-words dark:text-white'>
            {reports}
          </div>
          <div className='text text-center w-28 break-words mr-10 dark:text-white'>
            {manager}
          </div>
        </div>
      </div>
    </>
  )
  return content
}

export default UserAccordionTitle
