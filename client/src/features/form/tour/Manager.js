import CurrentForm from '../../../services/CurrentForm'
import ProgressBar from '../../../components/headers/ProgressBar'
import AreaAccordion from '../../../components/accordions/AreaAccordion'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SectionBanner from '../../../components/titles/SectionBanner'
import ImageCard from '../../../components/cards/ImageCard'
import PreviousButton from '../../../components/buttons/PreviousButton'
import TourScene from '../../../components/TourScene'
import ReadyButton from '../../../components/buttons/ReadyButton'

/*
 * Link a requerimientos funcionales:
 * https://docs.google.com/spreadsheets/d/1Eme0YIj9GZCc3QCBQehDUGZIgS7aTilZx4oUy35dcGc/edit?usp=sharing
 */

// Historia de usuario M13_H1
const Manager = () => {
  const navigate = useNavigate()
  const Form = CurrentForm.getInstance()
  const areas = Form.getAreasBySection(5)
  const [currentPercentage, setCurrentPercentage] = useState(Form.getCompletionPercentage())

  const updatePercentage = () => {
    setCurrentPercentage(Form.getCompletionPercentage())
  }

  const listContent = areas?.length
    ? areas.map((area, id) => (
      <AreaAccordion key={area.idArea} section={5} area={area} index={id} onClicked={updatePercentage} />
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
          <SectionBanner myText='Gerente' />
        </div>

        <TourScene questionContent={listContent}>
          <div className='flex-col w-full my-auto'>
            <div className='object-scale-down h-48 w-96'>
              <ImageCard imgName='Manager.png' />
            </div>

            <div className='flex flex-row w-11/12 justify-between ml-3'>
              <div className='w-32'>
                <PreviousButton onClicked={e => navigate('/form/client')} />
              </div>
              <div className='w-32' />
            </div>
          </div>
        </TourScene>
      </div>
    </>
  )
  return content
}

export default Manager
