import { Accordion, Button, Modal } from 'flowbite-react'
import ModifiedFooter from '../../components/ModifiedFooter'
import NavBar from '../../components/NavBar'
import { AccordionTitle } from 'flowbite-react/lib/esm/components/Accordion/AccordionTitle'
import { AccordionContent } from 'flowbite-react/lib/esm/components/Accordion/AccordionContent'
import { AccordionPanel } from 'flowbite-react/lib/esm/components/Accordion/AccordionPanel'
const SectionList = () => {
  let content
  content = (
    <div>
      <NavBar />
      <div className='pt-20 w-ful h-screen flex flex-col items-center'>

        <div className='container flex flex-wrap justify-items-stretch'>
          <Accordion>
            <AccordionPanel>
              <AccordionTitle>
                Exterior
              </AccordionTitle>
              <AccordionContent>
                Preguntas
              </AccordionContent>
            </AccordionPanel>
            <AccordionPanel>
              <AccordionTitle>
                Interior
              </AccordionTitle>
              <AccordionContent>
                Preguntas
              </AccordionContent>
            </AccordionPanel>
          </Accordion>
        </div>
        <ModifiedFooter />
      </div>
    </div>
  )

  return content
}

export default SectionList
