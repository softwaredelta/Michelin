import CurrentForm from '../../../services/CurrentForm'
import ProgressBar from '../../../components/ProgressBar'
import AreaAccordion from '../../../components/AreaAccordion'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SectionBanner from '../../../components/SectionBanner'
import TourScene from '../../../components/TourScene'
import ImageCard from '../../../components/ImageCard'
import NextButton from '../../../components/NextButton'
import PreviousButton from '../../../components/PreviousButton'
import VisualKey from '../../../components/VisualKey'
import ReadyButton from '../../../components/ReadyButton'

/*
 * Link a requerimientos funcionales:
 * https://docs.google.com/spreadsheets/d/1Eme0YIj9GZCc3QCBQehDUGZIgS7aTilZx4oUy35dcGc/edit?usp=sharing
 */

// Historia de usuario M13_H1
const Exterior = () => {
  const navigate = useNavigate()
  const Form = CurrentForm.getInstance()
  const areas = Form.getAreasBySection(2)
  const [currentPercentage, setCurrentPercentage] = useState(Form.getCompletionPercentage())

  const updatePercentage = () => {
    setCurrentPercentage(Form.getCompletionPercentage())
  }

  const listContent = areas?.length
    ? areas.map((area, id) => (
      <AreaAccordion key={area.idArea} section={2} area={area} index={id} onClicked={updatePercentage} />
    ))
    : null

  useEffect(() => {
    if (Form.idSp === 0) {
      navigate('/form')
    }
  })

  const handleClick = (myId) => {
    console.log(myId)
    const myElement = document.getElementById(myId)
    myElement.children[1].hidden = !myElement.children[1].hidden
    myElement.scrollIntoView()
    // <myElement className=""></myElement> = true;
  }

  const content = (
    <>
      <div className='w-full max-h-screen overflow-y-scroll'>
        <div className='!bg-blues-300 absolute top-6 right-5 mt-4'>
          <ReadyButton intPeansweredrcentage={currentPercentage} />
        </div>
        <div className='relative'>
          <ProgressBar />
        </div>
        <div>
          <SectionBanner myText='Exterior' />
        </div>

        <TourScene questionContent={listContent}>
          <div className='absolute w-10 xl:pb-5 lg:pb-3 lg:right-44 lg:bottom-64 iPadAir:right-48 iPadAir:bottom-52 xl:bottom-40 xl:right-72'>
            <VisualKey myName={13} method={() => handleClick(13)} />
          </div>
          <div className='absolute w-10 xl:pb-5 lg:pb-5 lg:right-28 lg:bottom-72 iPadAir:right-32 iPadAir:bottom-64 xl:bottom-52 xl:right-56'>
            <VisualKey myName={12} method={() => handleClick(12)} />
          </div>
          <div className='absolute w-10 xl:pb-5 lg:mb-3 lg:pb-3 lg:right-24 lg:bottom-80 iPadAir:mb-3 iPadAir:right-28 iPadAir:bottom-72 xl:bottom-60 xl:right-48'>
            <VisualKey myName={11} method={() => handleClick(11)} />
          </div>
          <div className='absolute w-10 xl:pb-5 lg:mt-4 lg:mr-3 lg:right-16 lg:top-80 iPadAir:mr-5 xl:top-60 xl:right-36'>
            <VisualKey myName={10} method={() => handleClick(10)} />
          </div>
          <div className='absolute w-10 xl:pb-5 lg:mt-1 lg:mr-3 lg:right-16 lg:top-72 iPadAir:mr-5 xl:top-52 xl:mt-2 xl:right-36'>
            <VisualKey myName={9} method={() => handleClick(9)} />
          </div>
          <div className='flex-col w-full my-auto'>
            <ImageCard imgName='Exterior.png' />
            <div className='absolute w-10 lg:right-16 lg:top-68 lg:pt-8 iPadAir:right-20 iPadAir:pt-12 xl:right-40 xl:top-32'>
              <VisualKey myName={8} method={() => handleClick(8)} />
            </div>
            <div className='absolute w-10 xl:pb-5 lg:right-28 iPadAir:top iPadAir:right-32 xl:right-52 xl:mr-1'>
              <VisualKey myName={7} method={() => handleClick(7)} />
            </div>
            <div className='relative w-10 lg:left-48 lg:top-2 iPadAir:left-56 iPadAir:top-3 xl:left-60 xl:top-4'>
              <VisualKey myName={6} method={() => handleClick(6)} />
            </div>
            <div className='relative w-10 lg:left-28 lg:bottom-2 iPadAir:left-36 iPadAir:top-1 xl:left-40 xl:top-3'>
              <VisualKey myName={5} method={() => handleClick(5)} />
            </div>
            <div className='relative w-10 lg:left-8 lg:bottom-2 iPadAir:left-12 iPadAir:top-3 xl:top-4'>
              <VisualKey myName={4} method={() => handleClick(4)} />
            </div>
            <div className='relative w-10 lg:left-6 iPadAir:top-4 iPadAir:left-7 xl:top-7 xl:left-10'>
              <VisualKey myName={3} method={() => handleClick(3)} />
            </div>
            <div className='relative w-10 lg:left-14 lg:bottom-2 iPadAir:left-20 iPadAir:top-3 xl:top-7'>
              <VisualKey myName={2} method={() => handleClick(2)} />
            </div>
            <div className='relative w-10 lg:left-10 lg:bottom-2 iPadAir:left-12 iPadAir:top-3 xl:top-9 xl:left-14'>
              <VisualKey myName={1} method={() => handleClick(1)} />
            </div>

            <div className='flex flex-row w-11/12 justify-between ml-3'>
              <div className='w-32'>
                <PreviousButton
                  onClicked={(e) => navigate('/form/preparation')}
                />
              </div>
              <div className='w-32'>
                <NextButton onClicked={(e) => navigate('/form/interior')} />
              </div>
            </div>
          </div>
        </TourScene>
      </div>
    </>
  )
  return content
}

export default Exterior
