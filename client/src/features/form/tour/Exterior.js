import CurrentForm from '../../../services/CurrentForm'
import ProgressBar from '../../../components/headers/ProgressBar'
import AreaOverview from '../AreaOverview'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SectionBanner from '../../../components/titles/SectionBanner'
import TourScene from '../../../components/TourScene'
import ImageCard from '../../../components/cards/ImageCard'
import NextButton from '../../../components/buttons/NextButton'
import PreviousButton from '../../../components/buttons/PreviousButton'
//import VisualKey from '../../../components/inputs/VisualKey'
import ReadyButton from '../../../components/buttons/ReadyButton'

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
      <AreaOverview key={area.idArea} section={2} area={area} index={id} method={updatePercentage} />
    ))
    : null

  useEffect(() => {
    if (Form.idSp === 0) {
      navigate('/form')
    }
  })

  // const handleClick = (myId) => {
  //   const myElement = document.getElementById(myId)
  //   myElement.children[1].hidden = !myElement.children[1].hidden
  //   myElement.scrollIntoView()
  // }

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
        <div className='flex-col w-full h-96 place-self-center mt-36 mx-auto'>
            <div className='place-self-center mr-24 scale-125 pb-28'>
              <ImageCard imgName='Exterior.png' />
            </div>
           {/*<div className='absolute w-10 xl:pb-5 lg:mb-8 lg:pb-1 lg:right-44 lg:bottom-56 iPadAir:bottom-48 iPadAir:mr-6 iPadAir:pb-2 xl:bottom-36 xl:right-64 2xl:bottom-44 2xl:right-72 2xl:mr-12'>
            <ImageCard imgName='Exterior.png' />
            <VisualKey myName={13} method={() => handleClick(13)} />
          </div>
          <div className='absolute w-10 lg:mb-8 lg:mr-2 lg:pb-5 lg:right-28 lg:bottom-60 iPadAir:bottom-60 iPadAir:mb-7 iPadAir:mr-8 xl:bottom-48 xl:right-44 2xl:bottom-48 2xl:mb-10 2xl:right-56'>
            <VisualKey myName={12} method={() => handleClick(12)} />
          </div>
          <div className='absolute w-10 xl:pb-5 lg:mb-12 lg:mr-1 lg:right-24 lg:bottom-72 iPadAir:bottom-72 iPadAir:mb-9 iPadAir:mr-5 xl:mb-0 xl:right-40 xl:mr-7 2xl:mb-3 2xl:right-52 2xl:mr-3'>
            <VisualKey myName={11} method={() => handleClick(11)} />
          </div>
          <div className='absolute w-10 xl:pb-5 lg:mt-6 lg:mr-3 lg:right-16 lg:top-64 iPadAir:top-72 iPadAir:mt-10 iPadAir:mr-6 xl:top-64 xl:right-28 xl:mr-7 2xl:top-96 2xl:right-40 '>
            <VisualKey myName={10} method={() => handleClick(10)} />
          </div>
          <div className='absolute w-10 xl:pb-8 lg:mt-0 lg:mr-3 lg:right-16 lg:top-60 iPadAir:top-60 iPadAir:mt-11 iPadAir:mr-6 xl:top-52 xl:right-32 xl:mr-8 2xl:top-80 2xl:mt-10 2xl:right-40'>
            <VisualKey myName={9} method={() => handleClick(9)} />
          </div>
          <div className='flex-col w-full h-96 place-self-center'>
            <ImageCard imgName='Exterior.png' />
            <div className='absolute w-10 lg:right-16 lg:top-48 lg:mt-3 lg:mr-2 iPadAir:top-52 iPadAir:mt-8 iPadAir:mr-5 xl:right-36 xl:mr-3 xl:top-44 xl:mt-7 2xl:top-64 2xl:right-40 2xl:mt-12'>
              <VisualKey myName={8} method={() => handleClick(8)} />
            </div>
            <div className='absolute w-10 xl:pb-2 lg:right-28 lg:mr-2 iPadAir:mt-1 iPadAir:right-32 xl:right-52 xl:mt-3 2xl:right-56 2xl:mr-6 2xl:mt-4'>
              <VisualKey myName={7} method={() => handleClick(7)} />
            </div>
            <div className='relative w-10 lg:left-48 lg:top-2 iPadAir:left-56 iPadAir:top-3 xl:top-5 xl:left-60 2xl:left-72 2xl:top-6 2xl:pl-3'>
              <VisualKey myName={6} method={() => handleClick(6)} />
            </div>
            <div className='relative w-10 lg:left-28 lg:bottom-2 iPadAir:left-36 iPadAir:top-1 xl:pl-2 2xl:left-48 2xl:top-5'>
              <VisualKey myName={5} method={() => handleClick(5)} />
            </div>
            <div className='relative w-10 lg:left-8 lg:bottom-2 iPadAir:left-12 iPadAir:top-3 xl:top-4 xl:left-12 2xl:top-10 2xl:left-20'>
              <VisualKey myName={4} method={() => handleClick(4)} />
            </div>
            <div className='relative w-10 lg:left-6 iPadAir:top-4 iPadAir:left-7 xl:top-7 xl:left-8 2xl:top-16 2xl:left-12'>
              <VisualKey myName={3} method={() => handleClick(3)} />
            </div>
            <div className='relative w-10 lg:left-14 lg:bottom-2 iPadAir:left-20 iPadAir:top-3 xl:top-8 2xl:top-20 2xl:left-28'>
              <VisualKey myName={2} method={() => handleClick(2)} />
            </div>
            <div className='relative w-10 lg:left-10 lg:bottom-2 iPadAir:left-12 iPadAir:top-3 xl:top-12 xl:left-16 2xl:top-24 2xl:left-20 '>
              <VisualKey myName={1} method={() => handleClick(1)} />
            </div> */}

            <div className='flex flex-row w-11/12 justify-between ml-3 mt-20'>
              <div className='w-32 pt-20'>
                <PreviousButton
                  onClicked={(e) => navigate('/form/preparation')}
                />
              </div>
              <div className='w-32 pt-20'>
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
