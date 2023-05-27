import CurrentForm from "../../../services/CurrentForm"
import { Accordion } from "flowbite-react"
import { AccordionPanel } from "flowbite-react/lib/esm/components/Accordion/AccordionPanel"
import { AccordionTitle } from "flowbite-react/lib/esm/components/Accordion/AccordionTitle"
import { AccordionContent } from "flowbite-react/lib/esm/components/Accordion/AccordionContent"
import TourQuestion from "../../../components/TourQuestion"
import AreaTitle from "../../../components/AreaTitle"
import ProgressBar from "../../../components/ProgressBar"

const Preparation = () => {
let Form = CurrentForm.getInstance()
const areas = Form.getAreasBySection(1)
let questions
let listContent

 for (let i = 0; i < areas.length; i++) {
     questions = Form.getQuestionsByArea(1,i)
     listContent = questions?.length
     ? questions.map((question, id) => (
       <TourQuestion key={question.idQuestion} question={question} area={i} section={1} index={id}/>
     ))
     : null 
}
    
  const content = (
    <>
    <ProgressBar/>
    <div className='container flex flex-wrap justify-items-stretch overflow-y-scroll'>
    <Accordion collapseAll alwaysOpen>
      <AccordionPanel>
        <AccordionTitle>
          <AreaTitle number={"1"} title={"Estacionamiento"}/>
        </AccordionTitle>
        <AccordionContent>
          {listContent}
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
    </div>
    </>
  )
  return content
}

export default Preparation
