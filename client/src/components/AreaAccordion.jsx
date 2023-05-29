import CurrentForm from '../services/CurrentForm'
import { Accordion } from 'flowbite-react'
import { AccordionPanel } from 'flowbite-react/lib/esm/components/Accordion/AccordionPanel'
import { AccordionContent } from 'flowbite-react/lib/esm/components/Accordion/AccordionContent'
import TourQuestion from './TourQuestion'
import AreaTitle from './AreaTitle'
import { AccordionTitle } from 'flowbite-react/lib/esm/components/Accordion/AccordionTitle'
import { useState } from 'react'

const AreaAccordion = ({ section, area, index }) => {
  const Form = CurrentForm.getInstance()

  const questions = Form.getQuestionsByArea(section, index)

  const [answerCount, setAnswerCount] = useState(Form.getAnsweredQuestionsByArea(section, index))

  const listContent = questions?.length
    ? questions.map((question, id) => (
      <TourQuestion key={question.idQuestion} question={question} area={index} section={section} index={id} setAnswerCount={setAnswerCount} />
    ))
    : <p className='dark:text-white italic text-2xl text-center'> No hay preguntas en esta área</p>

  const content = (

    <Accordion collapseAll alwaysOpen>
      <AccordionPanel>
        <AccordionTitle>
          <AreaTitle number={index} title={area.areaTitle} questions={questions.length} answered={answerCount} />
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
