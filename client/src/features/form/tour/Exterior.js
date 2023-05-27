import CurrentForm from "../../../services/CurrentForm"
import ProgressBar from "../../../components/ProgressBar"
import AreaAccordion from "../../../components/AreaAccordion"

const Exterior = () => {
let Form = CurrentForm.getInstance()
const areas = Form.getAreasBySection(2)
let listContent
  
    listContent = areas?.length
     ? areas.map((area, id) => (
       <AreaAccordion key={area.idArea} section={2} area={area} index={id}/>
     ))
     : null 
    
  const content = (
    <>
    <ProgressBar/>
    <div className='container flex flex-wrap justify-items-stretch overflow-y-scroll'>
    {listContent}
    </div>
    </>
  )
  return content
}

export default Exterior
