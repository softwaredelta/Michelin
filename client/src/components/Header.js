const Header = ({ myText }) => {
  return (
    <div className='min-w-full'>
      <div className='!bg-blues-200 flex rounded-lg self-start mx-5 mb-5 dark:!bg-blues-400'>
        <h5 className='text-3xl text-white font-bold p-3'>{myText}</h5>
      </div>
    </div>
  )
}

export default Header
