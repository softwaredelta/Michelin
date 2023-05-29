
const Header = ({ myText }) => {
  const content = (
    <div className='min-w-full'>
      <div className='!bg-blues-200 flex rounded-lg self-start mx-5 mb-5 dark:!bg-blues-300'>
        <h5 className=' font-michelinl text-xl text-white font-bold p-3'>{myText}</h5>
      </div>
    </div>
  )
  return content
}

export default Header
