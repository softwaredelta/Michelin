const TourScene = ({ questionContent, children }) => {
  const content = (
    <>
      <div className='w-full h-screen flex flex-col items-center !bg-blues-300'>
        <div className='container h-screen flex flex-wrap justify-items-stretch'>
          <div className='w-full h-11/12 flex flex-row justify-between'>
            <div className='flex-col w-full my-20 pt-28 rounded-lg'>
              <div className='ml-12 w-9/12 h-96 bg-white overflow-y-auto rounded-xl'>
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
