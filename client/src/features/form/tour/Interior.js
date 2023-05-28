import CurrentForm from '../../../services/CurrentForm'
import ProgressBar from '../../../components/ProgressBar'
import AreaAccordion from '../../../components/AreaAccordion'

const Interior = () => {
  const Form = CurrentForm.getInstance()
  const areas = Form.getAreasBySection(3)

  const listContent = areas?.length
    ? areas.map((area, id) => (
      <AreaAccordion key={area.idArea} section={3} area={area} index={id} />
    ))
    : null

  const content = (
    <>
      <ProgressBar />
      <div className='pt-20 w-full h-screen flex flex-col items-center dark:!bg-blues-400'>
        {listContent}
      </div>
    </>
  )
  return content
}

export default Interior
