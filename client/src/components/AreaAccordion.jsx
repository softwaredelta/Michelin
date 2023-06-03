import CurrentForm from '../services/CurrentForm'
import { Accordion } from 'flowbite-react'
import { AccordionPanel } from 'flowbite-react/lib/esm/components/Accordion/AccordionPanel'
import { AccordionContent } from 'flowbite-react/lib/esm/components/Accordion/AccordionContent'
import TourQuestion from './TourQuestion'
import AreaTitle from './AreaTitle'
import { AccordionTitle } from 'flowbite-react/lib/esm/components/Accordion/AccordionTitle'
import { useState } from 'react'

const AreaAccordion = ({ section, area, index, onClicked }) => {
  const Form = CurrentForm.getInstance()

  const questions = Form.getQuestionsByArea(section, index)

  const [answerCount, setAnswerCount] = useState(Form.getAnsweredQuestionsByArea(section, index))

  const listContent = questions?.length
    ? questions.map((question, id) => (
      <TourQuestion key={question.idQuestion} question={question} area={index} section={section} index={id} setAnswerCount={setAnswerCount} />
    ))
    : <p className='dark:text-black italic text-2xl text-center'> No hay preguntas en esta área</p>

  const content = (
    <Accordion
      id={index + 1}
      collapseAll
      alwaysOpen
      className='!bg-white mb-2 dark:!bg-white'
      onClick={onClicked}
    >
      <AccordionPanel>
        <AccordionTitle className='dark:!bg-white'>
          <AreaTitle
            number={index + 1}
            title={area.areaTitle}
            questions={questions.length}
            answered={answerCount}
          />
        </AccordionTitle>
        <AccordionContent className='dark:!bg-white'>
          <div className='overflow-y-auto h-full dark:!bg-white'>{listContent}</div>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  )
  return content
}

export default AreaAccordion
