const SectionBanner = ({ myText }) => {
  return (
    <>
      <div
        class='absolute top-6 2xl:w-1/4 xl:w-1/3 iPadAir:w-1/3 lg:w-5/12 h-0
        border-l-[100px] border-l-trademark-50
        border-t-[65px] border-t-trademark-50
        border-r-[50px] border-r-transparent'
      />
      <div className='absolute top-10 left-7 text-3xl text-blues-300 font-michelin'>{myText}</div>
    </>
  )
}

export default SectionBanner
