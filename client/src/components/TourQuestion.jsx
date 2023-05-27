import { AccordionContent } from 'flowbite-react/lib/esm/components/Accordion/AccordionContent'
import AnsButtons from './AnsButtons'

const TourQuestion = ({ question, area, section, index }) => {
  const content = (
    <>
      <AccordionContent className='text-center'>
        <p className='dark:text-white italic text-2xl text-center'> {question.questionText}</p>
        <AnsButtons question={question} area={area} section={section} index={index} />
      </AccordionContent>
    </>
  )
  return content
}
export default TourQuestion
