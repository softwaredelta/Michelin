import CurrentForm from '../../../services/CurrentForm'
import ProgressBar from '../../../components/ProgressBar'
import AreaAccordion from '../../../components/AreaAccordion'

const Exterior = () => {
  const Form = CurrentForm.getInstance()
  const areas = Form.getAreasBySection(2)

  const listContent = areas?.length
    ? areas.map((area, id) => (
      <AreaAccordion key={area.idArea} section={2} area={area} index={id} />
    ))
    : null

  const content = (
    <>
      <div>
        <ProgressBar />
        <div className='pt-20 w-full min-h-screen flex flex-col items-center dark:!bg-blues-400'>
          <div className='container flex flex-wrap justify-items-stretch' />

          <div className='w-2/5 mb-6'>{listContent}</div>
        </div>
      </div>
    </>
  )
  return content
}

export default Exterior
