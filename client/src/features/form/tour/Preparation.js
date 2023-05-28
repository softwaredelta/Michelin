import CurrentForm from '../../../services/CurrentForm'
import ProgressBar from '../../../components/ProgressBar'
import AreaAccordion from '../../../components/AreaAccordion'

const Preparation = () => {
  const Form = CurrentForm.getInstance()
  const areas = Form.getAreasBySection(1)

  const listContent = areas?.length
    ? areas.map((area, id) => (
      <AreaAccordion key={area.idArea} section={1} area={area} index={id} />
    ))
    : null

  const content = (
    <>
      <ProgressBar />
      <div className='container flex flex-wrap justify-items-stretch overflow-y-scroll'>
        {listContent}
      </div>
    </>
  )
  return content
}

export default Preparation
