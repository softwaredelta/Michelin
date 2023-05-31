
const Header = ({ myText }) => {
  const content = (
    <div className='min-w-full'>
      <div className='flex rounded-lg self-start mx-5 mb-5 dark:!bg-blues-300 !bg-gradient-to-r from-blues-200 to-blues-150'>
        <h5 className='font-michelinsb text-xl text-white font-fold p-3'>{myText}</h5>
      </div>
    </div>
  )
  return content
}

export default Header
