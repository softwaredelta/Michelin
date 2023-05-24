import { Accordion } from 'flowbite-react'
import { AccordionTitle } from 'flowbite-react/lib/esm/components/Accordion/AccordionTitle'
import { AccordionPanel } from 'flowbite-react/lib/esm/components/Accordion/AccordionPanel'
import { AccordionContent } from 'flowbite-react/lib/esm/components/Accordion/AccordionContent'
import AreaTitle from './AreaTitle'
import AnsButtons from './AnsButtons'

const TourQuestion = () => {
  const content = (
    <>
      <Accordion collapseAll alwaysOpen>
        <AccordionPanel>
          <AccordionTitle>
            <AreaTitle />
          </AccordionTitle>
          <AccordionContent className='text-center'>
            <p className='dark:text-white italic text-2xl text-center'> Pregunta muy larga que aqui iría jijijajaj mucho texto vamos a cambiarle el tamaño </p>
            <AnsButtons />
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </>
  )
  return content
}
export default TourQuestion
