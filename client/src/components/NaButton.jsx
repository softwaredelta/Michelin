const myfunction = () => {
  console.log('CLICKED')
}

const NaButton = () => {
  const content = (
    <>
      <button className='scale-50'><img src='/images/naButton.png' onClick={myfunction} /></button>
    </>
  )
  return content
}
export default NaButton
