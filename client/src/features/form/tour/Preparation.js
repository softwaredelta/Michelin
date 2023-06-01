import CurrentForm from '../../../services/CurrentForm'
import ProgressBar from '../../../components/ProgressBar'
import AreaAccordion from '../../../components/AreaAccordion'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import ReadyButton from '../../../components/ReadyButton'

const Preparation = () => {
  const navigate = useNavigate()
  const Form = CurrentForm.getInstance()
  const areas = Form.getAreasBySection(1)
  const answered = 50

  const listContent = areas?.length
    ? areas.map((area, id) => (
      <AreaAccordion key={area.idArea} section={1} area={area} index={id} />
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
        <ProgressBar />
        <div className='pt-20 w-full min-h-screen flex flex-col items-center dark:!bg-blues-400'>
          <div className='w-3/5 h-8'> 
        <ReadyButton answered={answered}/>
        </div>
          <div className='container flex flex-wrap justify-items-stretch' />

          <div className='w-2/5 mb-6'>{listContent}</div>
        </div>
      </div>
    </>
  )
  return content
}

export default Preparation
