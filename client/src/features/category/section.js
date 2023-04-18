import { Accordion } from 'flowbite-react'
import { AccordionTitle } from 'flowbite-react/lib/esm/components/Accordion/AccordionTitle'
import { AccordionContent } from 'flowbite-react/lib/esm/components/Accordion/AccordionContent'
import { AccordionPanel } from 'flowbite-react/lib/esm/components/Accordion/AccordionPanel'
const Section = ({ id, name }) => {
  let content
  content = (
    <AccordionPanel>
      <AccordionTitle>
        {name}
      </AccordionTitle>
      <AccordionContent>
        Hola
      </AccordionContent>
    </AccordionPanel>
  )

  return content
}

export default Section
