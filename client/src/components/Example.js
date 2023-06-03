import ImageCard from './ImageCard'
import TourCard from './TourCard'
import VisualKey from './VisualKey'
import SectionBanner from './SectionBanner'
import ProgressBar from './ProgressBar'
import NextButton from './NextButton'
import PreviousButton from './PreviousButton'
import ReadyButton from './ReadyButton'

const Example = () => {
  return (
    <>
      <div>
        <div className='!bg-blues-300 absolute top-6 right-20 mt-4'>
          <ReadyButton intPeansweredrcentage={30} />
        </div>
        <div className='relative'>
          <ProgressBar />
        </div>

        <div>
          <SectionBanner myText='Example' />
        </div>
        <div className='w-full h-screen flex flex-col items-center !bg-blues-300'>
          <div className='container h-screen flex flex-wrap justify-items-stretch'>
            <div className='w-full h-11/12 flex flex-row justify-between'>
              <div className='flex-col w-full my-20'>
                <TourCard />
              </div>
              <div className='flex-col w-full my-auto'>
                <ImageCard />
                <div className='relative left-5 top-32'>
                  <VisualKey myLink='#Holis' />
                </div>

                <div className='flex flex-row w-11/12 justify-between ml-3'>
                  <div className='w-32'>
                    <div>
                      <PreviousButton />
                    </div>
                  </div>

                  <div className='w-32'>
                    <div>
                      <NextButton />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Example
