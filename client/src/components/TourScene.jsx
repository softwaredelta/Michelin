const TourScene = ({ questionContent, children }) => {
  const content = (
    <>
      <div className='w-full h-screen flex flex-col items-center !bg-blues-300'>
        <div className='container h-screen flex flex-wrap justify-items-stretch'>
          <div className='w-full h-11/12 flex flex-row justify-between'>
            <div className='flex-col w-full my-20 pt-28 rounded-lg'>
              <div className='ml-4 w-5/6 h-96 overflow-y-auto'>
                {questionContent}
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  )
  return content
}

export default TourScene
