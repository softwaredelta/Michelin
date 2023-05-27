import { Accordion } from 'flowbite-react'
import { AccordionTitle } from 'flowbite-react/lib/esm/components/Accordion/AccordionTitle'
import { AccordionPanel } from 'flowbite-react/lib/esm/components/Accordion/AccordionPanel'
import { AccordionContent } from 'flowbite-react/lib/esm/components/Accordion/AccordionContent'
import { useSelector } from 'react-redux'
import { selectSPById } from '../features/sellingPoint/sellingPointApiSlice'


const SPAcordion = (spId) => {
  const sp = useSelector(state => selectSPById(state, spId))

  const content = (
    <>
      <div className='flex flex-row justify-center'>
      <div className='w-11/12 mb-6'>
        <Accordion collapseAll alwaysOpen>
          <AccordionPanel className='h-32' >
            <AccordionTitle className='!bg-gradient-to-r from-white from-50% to-gray-50 dark:!bg-gradient-to-r dark:from-trademark-50 dark:to-blues-200'>
              <div className='flex flex-row justify-between w-full text-3xl'>
                sectionTitle
              </div>
            </AccordionTitle>
            <AccordionContent className='dark:!bg-slate-700'>
          <div className='flex w-full justify-between mr-80'>
            <div className='flex flex-row justify-between w-11/12'>
              <div className='flex flex-col mx-5'>
                <div className='flex flex-row my-2 dark:!text-white'>
                  <p className='font-semibold mr-2'> TBM Asignado:</p>
                  <p className='font-medium'> ame </p>
                </div>
                <div className='flex flex-row my-2 dark:!text-white'>
                  <p className='font-semibold mr-2'> Tiempo:</p>
                  <p className='font-medium'> time </p>
                </div>
                <a target='_blank' rel='noreferrer'>
                  <div className='flex flex-row w-5/6 my-2 font-semibold dark:!text-white border-b border-black dark:!border-white cursor-pointer'>
                    Ver Reporte PDF
                  </div>
                </a>
              </div>
            </div>
          </div>
             </AccordionContent>
          </AccordionPanel>
        </Accordion>
        </div>
      </div>
    </>
  )
  return content
}

export default SPAcordion
