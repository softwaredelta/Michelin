import CurrentForm from "../services/CurrentForm";
import { Accordion } from "flowbite-react";
import { AccordionPanel } from "flowbite-react/lib/esm/components/Accordion/AccordionPanel";
import { AccordionContent } from "flowbite-react/lib/esm/components/Accordion/AccordionContent";
import TourQuestion from "./TourQuestion";
import AreaTitle from "./AreaTitle";
import { AccordionTitle } from "flowbite-react/lib/esm/components/Accordion/AccordionTitle";

const AreaAccordion = ({section, area, index}) => {
    let Form = CurrentForm.getInstance()
    let listContent

    const questions = Form.getQuestionsByArea(section,index)
    console.log(questions)
    listContent = questions?.length
    ? questions.map((question, id) =>(
        <TourQuestion key={question.idQuestion} question = {question} area ={index} section={section} index={id} />
    ))
    : <p className="dark:text-white italic text-2xl text-center"> No hay preguntas en esta área</p>
    let disable = false
    const myFunction = () =>{
        disable = true
    }
    const content =(
        <Accordion collapseAll alwaysOpen onClose={myFunction}>
            <AccordionPanel>
                <AccordionTitle>
                    <AreaTitle number={index} title={area.areaTitle}/>
                </AccordionTitle>
                <AccordionContent>
                    {listContent}
                </AccordionContent>
            </AccordionPanel>
        </Accordion>
    )
    return content
}

export default AreaAccordion