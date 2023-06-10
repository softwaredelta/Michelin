import { Accordion } from 'flowbite-react'
import { AccordionTitle } from 'flowbite-react/lib/esm/components/Accordion/AccordionTitle'
import { AccordionPanel } from 'flowbite-react/lib/esm/components/Accordion/AccordionPanel'

const InfoAccordion = ({ icon, accordionContent, sectionTitle }) => {
  const content = (
    <>
      <div className="w-11/12 mb-6">
        <Accordion collapseAll alwaysOpen>
          <AccordionPanel>
            <AccordionTitle className="!bg-gradient-to-r from-white from-50% to-gray-50 dark:!bg-gradient-to-r dark:from-blues-300 dark:to-blues-200 top-0 z-10 sticky border-2">
              <div className="flex flex-row justify-between w-full">
                <div className="flex flex-col md:mx-3 small:m-0 center">
                  {icon}
                </div>
                {sectionTitle}
              </div>
            </AccordionTitle>
            {accordionContent}
          </AccordionPanel>
        </Accordion>
      </div>
    </>
  );
  return content
}

export default InfoAccordion
