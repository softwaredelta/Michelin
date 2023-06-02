import CurrentForm from '../../../services/CurrentForm'
import ProgressBar from '../../../components/ProgressBar'
import AreaAccordion from '../../../components/AreaAccordion'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SectionBanner from '../../../components/SectionBanner'
import ImageCard from '../../../components/ImageCard'
import PreviousButton from '../../../components/PreviousButton'
import TourScene from '../../../components/TourScene'

/*
 * Link a requerimientos funcionales:
 * https://docs.google.com/spreadsheets/d/1Eme0YIj9GZCc3QCBQehDUGZIgS7aTilZx4oUy35dcGc/edit?usp=sharing
 */

// Historia de usuario M13_H1
const Manager = () => {
  const navigate = useNavigate()
  const Form = CurrentForm.getInstance()
  const areas = Form.getAreasBySection(5)

  const listContent = areas?.length
    ? areas.map((area, id) => (
      <AreaAccordion key={area.idArea} section={5} area={area} index={id} />
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
        <div className='relative'>
          <ProgressBar />
        </div>
        <div>
          <SectionBanner myText='Gerente' />
        </div>

        <TourScene questionContent={listContent}>
          <div className='flex-col w-full my-auto'>
            <ImageCard />
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
