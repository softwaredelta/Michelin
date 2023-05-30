const UserAccordionTitle = ({ name, zone, date }) => {
  const content = (
    <>
      <div className='flex flex-row mr-7'>
        <div className='grid grid-cols-3 xl:gap-64 lg:gap-28 md:gap-32 sm:gap-3 w-full'>
          <div className='text dark:!text-zinc-200 text-center w-28 md:text-base small:text-sm break-words'>
            {name}
          </div>
          <div className='text dark:!text-zinc-200 text-center w-28 md:text-base small:text-sm break-words'>
            {zone}
          </div>
          <div className='text dark:!text-zinc-200 text-center w-28 break-words md:text-base small:text-sm'>
            {date}
          </div>
        </div>
      </div>
    </>
  )
  return content
}

export default UserAccordionTitle
