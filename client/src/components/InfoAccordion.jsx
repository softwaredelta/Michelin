import { Accordion } from 'flowbite-react'
import { AccordionTitle } from 'flowbite-react/lib/esm/components/Accordion/AccordionTitle'
import { AccordionPanel } from 'flowbite-react/lib/esm/components/Accordion/AccordionPanel'
// import QuestionOverview from "../features/category/questions/QuestionOverview";

const InfoAccordion = ({ icon, content, sectionTitle }) => {
  return (
    <>
      <div className='w-11/12 mb-6'>
        <Accordion alwaysOpen>
          <AccordionPanel>
            <AccordionTitle className='!bg-gradient-to-r from-white from-50% to-gray-50 dark:!bg-gradient-to-r dark:from-blues-300 dark:to-blues-200'>
              <div className='flex flex-row justify-between w-full'>
                <div className='flex flex-col mx-3 center'>{icon}</div>
                {sectionTitle}
              </div>
            </AccordionTitle>
            {content}
          </AccordionPanel>
        </Accordion>
      </div>
    </>
  )
}

export default InfoAccordion
