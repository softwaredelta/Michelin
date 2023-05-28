import CurrentForm from '../services/CurrentForm'
import { Accordion } from 'flowbite-react'
import { AccordionPanel } from 'flowbite-react/lib/esm/components/Accordion/AccordionPanel'
import { AccordionContent } from 'flowbite-react/lib/esm/components/Accordion/AccordionContent'
import TourQuestion from './TourQuestion'
import AreaTitle from './AreaTitle'
import { AccordionTitle } from 'flowbite-react/lib/esm/components/Accordion/AccordionTitle'

const AreaAccordion = ({ section, area, index }) => {
  const Form = CurrentForm.getInstance()

  const questions = Form.getQuestionsByArea(section, index)
  const listContent = questions?.length
    ? questions.map((question, id) => (
      <TourQuestion key={question.idQuestion} question={question} area={index} section={section} index={id} />
    ))
    : <p className='dark:text-white italic text-2xl text-center'> No hay preguntas en esta área</p>

  const content = (
    <div className='flex flex-row justify-center'>
    <div className='mb-6'>
    <Accordion collapseAll alwaysOpen>
      <AccordionPanel>
        <AccordionTitle>
          <AreaTitle number={index} title={area.areaTitle} questions={questions.length} />
        </AccordionTitle>
        <AccordionContent >
          {listContent}
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
    </div>
    </div>
  )
  return content
}

export default AreaAccordion
