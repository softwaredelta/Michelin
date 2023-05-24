const myfunction = () => {
  console.log('CLICKED')
}

const RedBibendum = () => {
  const content = (
    <>
      <button className='scale-50 rounded-full bg-white bg-fixed opacity-100 transition duration-300 ease-in-out hover:opacity-40'><img src='/images/redBibendum.png' onClick={myfunction} /></button>
    </>
  )
  return content
}
export default RedBibendum
