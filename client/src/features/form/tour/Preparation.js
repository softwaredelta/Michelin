import CurrentForm from '../../../services/CurrentForm'
import ProgressBar from '../../../components/headers/ProgressBar'
import AreaAccordion from '../../../components/accordions/AreaAccordion'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SectionBanner from '../../../components/titles/SectionBanner'
import TourScene from '../../../components/TourScene'
import ImageCard from '../../../components/cards/ImageCard'
import NextButton from '../../../components/buttons/NextButton'
import ReadyButton from '../../../components/buttons/ReadyButton'

/*
 * Link a requerimientos funcionales:
 * https://docs.google.com/spreadsheets/d/1Eme0YIj9GZCc3QCBQehDUGZIgS7aTilZx4oUy35dcGc/edit?usp=sharing
 */

// Historia de usuario M13_H1
const Preparation = () => {
  const navigate = useNavigate()
  const Form = CurrentForm.getInstance()
  const areas = Form.getAreasBySection(1)
  const [currentPercentage, setCurrentPercentage] = useState(Form.getCompletionPercentage())

  const updatePercentage = () => {
    setCurrentPercentage(Form.getCompletionPercentage())
  }

  const listContent = areas?.length
    ? areas.map((area, id) => (
      <AreaAccordion key={area.idArea} section={1} area={area} index={id} onClicked={updatePercentage} />
    ))
    : null

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
          <SectionBanner myText='Preparación' />
        </div>

        <TourScene questionContent={listContent}>
          <div className='flex-col w-full my-auto'>
            <div className='object-scale-down h-48 w-96'>
              <ImageCard imgName='Preparation.png' />
            </div>
            <div className='flex flex-row w-11/12 justify-between ml-3'>
              <div className='w-32' />
              <div className='w-32'>
                <div>
                  <NextButton onClicked={e => navigate('/form/exterior')} />
                </div>
              </div>
            </div>
          </div>
        </TourScene>
      </div>
    </>
  )
  return content
}

export default Preparation
