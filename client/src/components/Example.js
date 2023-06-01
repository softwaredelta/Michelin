import ImageCard from './ImageCard'
import TourCard from './TourCard'
import VisualKey from './VisualKey'
import YellowButton from './YellowButton'
import SectionBanner from './SectionBanner'

const Example = () => {
  return (
    <>
      <div>
        <div>
          <SectionBanner />
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
                <div>
                  <YellowButton myText='Holis' />
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
