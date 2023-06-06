import { Accordion } from 'flowbite-react'
import { AccordionPanel } from 'flowbite-react/lib/esm/components/Accordion/AccordionPanel'
import { AccordionContent } from 'flowbite-react/lib/esm/components/Accordion/AccordionContent'
import AreaTitle from '../titles/AreaTitle'
import { AccordionTitle } from 'flowbite-react/lib/esm/components/Accordion/AccordionTitle'

const AreaAccordion = ({ areaTitle, index, onClicked, questionContent, questionCount, answerCount }) => {
  const content = (
    <Accordion
      id={index + 1}
      collapseAll
      alwaysOpen
      className='!bg-white mb-2 dark:!bg-white'
      onClick={onClicked}
    >
      <AccordionPanel>
        <AccordionTitle className='dark:!bg-white bg-neutral-100 border border-gray-400 top-0 z-10 sticky'>
          <AreaTitle
            number={index + 1}
            title={areaTitle}
            questions={questionCount}
            answered={answerCount}
          />
        </AccordionTitle>
        <AccordionContent className='dark:!bg-white'>
          <div className='overflow-y-auto dark:!bg-white'>{questionContent}</div>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  )
  return content
}

export default AreaAccordion
