const ImageCard = ({ imgName }) => {
  return (
    <>
      <div className='w-full'>
        <img
          className='object-cover float-right w-11/12 overflow-hidden'
          src={'/images/' + imgName}
          alt='imagen de vehículo'
        />
      </div>
    </>
  )
}

export default ImageCard
