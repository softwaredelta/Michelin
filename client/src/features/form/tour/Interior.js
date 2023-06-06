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
import VisualKey from '../../../components/inputs/VisualKey'
import ReadyButton from '../../../components/buttons/ReadyButton'

/*
 * Link a requerimientos funcionales:
 * https://docs.google.com/spreadsheets/d/1Eme0YIj9GZCc3QCBQehDUGZIgS7aTilZx4oUy35dcGc/edit?usp=sharing
 */

// Historia de usuario M13_H1
const Interior = () => {
  const navigate = useNavigate()
  const Form = CurrentForm.getInstance()
  const areas = Form.getAreasBySection(3)
  const [currentPercentage, setCurrentPercentage] = useState(Form.getCompletionPercentage())

  const updatePercentage = () => {
    setCurrentPercentage(Form.getCompletionPercentage())
  }

  const listContent = areas?.length
    ? areas.map((area, id) => (
      <AreaOverview key={area.idArea} section={3} area={area} index={id} onClicked={updatePercentage} />
    ))
    : null

  const handleClick = (myId) => {
    const myElement = document.getElementById(myId)
    myElement.children[1].hidden = !myElement.children[1].hidden
    myElement.scrollIntoView()
  }

  useEffect(() => {
    if (Form.idSp === 0) {
      navigate('/form')
    }
  })

  const content = (
    <>
      <div>
        <div className='!bg-blues-300 absolute top-6 right-5 mt-4'>
          <ReadyButton intPeansweredrcentage={currentPercentage} />
        </div>
        <div className='relative'>
          <ProgressBar />
        </div>
        <div>
          <SectionBanner myText='Interior' />
        </div>

        <TourScene questionContent={listContent}>
          <div className='flex-col w-full h-96 place-self-center mt-36 mx-auto'>
            <div className='absolute w-10 lg:mb-6 lg:mr-3 lg:right-16 lg:bottom-64 iPadAir:mb-7 iPadAir:right-16 iPadAir:mr-6 xl:bottom-60 xl:right-32 2xl:bottom-72 2xl:right-40'>
              <VisualKey myName={11} method={() => handleClick(11)} />
            </div>
            <div className='absolute w-10 xl:pb-5 lg:pb-0 lg:mt-11 lg:mr-1 lg:right-16 lg:top-72 iPadAir:mr-3 iPadAir:mt-20 xl:top-72 xl:mt-10 xl:right-32 xl:mr-4 2xl:top-96 2xl:right-40'>
              <VisualKey myName={10} method={() => handleClick(10)} />
            </div>
            <div className='absolute w-10 lg:mt-2 lg:mr-1 lg:right-16 lg:top-72 iPadAir:mr-3 iPadAir:top-80 2xl:right-40 2xl:mt-20 xl:right-32 xl:top-64'>
              <VisualKey myName={9} method={() => handleClick(9)} />
            </div>
            <ImageCard imgName='Interior.png' />
            <div className='absolute w-10 lg:mr-2 lg:right-12 lg:top-60 lg:mt-5 iPadAir:right-16 iPadAir:pt-8 2xl:right-44 2xl:mr-4 2xl:top-72 xl:right-36 xl:top-44'>
              <VisualKey myName={8} method={() => handleClick(8)} />
            </div>
            <div className='absolute w-10 pb-5 lg:right-20 lg:mr-3 iPadAir:right-24 iPadAir:top-64 2xl:right-16 2xl:mr-5 2xl:pt-6 xl:top-52 xl:right-40'>
              <VisualKey myName={7} method={() => handleClick(7)} />
            </div>
            <div className='relative w-10 lg:left-72 lg:bottom-4 iPadAir:left-80 iPadAir:bottom-0 xl:pl-8 2xl:left-96 2xl:pl-12 2xl:top-0'>
              <VisualKey myName={6} method={() => handleClick(6)} />
            </div>
            <div className='relative w-10 lg:left-40 lg:bottom-16 iPadAir:left-48 xl:ml-2 iPadAir:bottom-12 2xl:left-60 2xl:bottom-10 2xl:pl-2'>
              <VisualKey myName={5} method={() => handleClick(5)} />
            </div>
            <div className='relative w-10 lg:left-16 lg:bottom-24 iPadAir:left-20 iPadAir:bottom-20 2xl:bottom-16 2xl:left-28'>
              <VisualKey myName={4} method={() => handleClick(4)} />
            </div>
            <div className='relative w-10 lg:left-14 lg:bottom-24 iPadAir:bottom-20 iPadAir:left-20 2xl:bottom-16 2xl:left-24 2xl:pl-2'>
              <VisualKey myName={3} method={() => handleClick(3)} />
            </div>
            <div className='relative w-10 lg:mr-1 lg:left-8 lg:bottom-28 iPadAir:left-12 iPadAir:bottom-20 2xl:bottom-14 2xl:left-16 2xl:pl-1'>
              <VisualKey myName={2} method={() => handleClick(2)} />
            </div>

            <div className='relative w-10 lg:bottom-28 lg:ml-10 iPadAir:left-4 iPadAir:bottom-20 2xl:left-10 2xl:bottom-12 xl:right-32 xl:bottom-20'>
              <VisualKey myName={1} method={() => handleClick(1)} />
            </div>

            <div className='flex flex-row w-11/12 justify-between ml-3 mt-2'>
              <div className='w-32'>
                <PreviousButton onClicked={(e) => navigate('/form/exterior')} />
              </div>
              <div className='w-32'>
                <NextButton onClicked={(e) => navigate('/form/client')} />
              </div>
            </div>
          </div>
        </TourScene>
      </div>
    </>
  )
  return content
}

export default Interior
