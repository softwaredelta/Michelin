import CurrentForm from '../../../services/CurrentForm'
import ProgressBar from '../../../components/ProgressBar'
import AreaAccordion from '../../../components/AreaAccordion'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

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
        <ProgressBar />
        <div className='pt-20 w-full min-h-screen flex flex-col items-center dark:!bg-blues-400'>
          <div className='container flex flex-wrap justify-items-stretch' />

          <div className='w-2/5 mb-6'>
            {listContent}
          </div>
        </div>

      </div>
    </>
  )
  return content
}

export default Manager
