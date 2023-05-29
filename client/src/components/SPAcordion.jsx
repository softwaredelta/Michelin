import { Accordion } from 'flowbite-react'
import { AccordionTitle } from 'flowbite-react/lib/esm/components/Accordion/AccordionTitle'
import { AccordionPanel } from 'flowbite-react/lib/esm/components/Accordion/AccordionPanel'
import { AccordionContent } from 'flowbite-react/lib/esm/components/Accordion/AccordionContent'
import { useSelector } from 'react-redux'
import { selectSPById } from '../features/sellingPoint/sellingPointApiSlice'
import { useNavigate } from 'react-router-dom'
import CurrentForm from '../services/CurrentForm'
import Bluebutton from './Bluebutton'

const SPAcordion = ({ spId }) => {
  const Form = CurrentForm.getInstance()
  const sp = useSelector(state => selectSPById(state, spId))
  const navigate = useNavigate()

  const startPreparation = () => {
    Form.setIdSp(spId)
    Form.setStartTime()
    navigate('/form/preparation')
  }

  const content = (
    <>
      <div className='flex flex-row justify-center'>
        <div className='w-11/12 mb-6'>
          <Accordion collapseAll alwaysOpen>
            <AccordionPanel>
              <AccordionTitle className="h-32 bg-[url('https://aecbmesvcm.cloudimg.io/v7/https://dcadprod.azureedge.net/b2c-experience-production/attachments/ckoaktxp706n801m4qyp64r0l-md-background-dealer-locator-1350x430px.max.jpg')]">
                <div className='flex flex-row justify-between w-full text-3xl font-michelin underline text-white'>
                  {sp.name}
                </div>
              </AccordionTitle>
              <AccordionContent className='dark:!bg-slate-700'>
                <div className='flex w-full justify-between mr-80'>
                  <div className='flex flex-row justify-between w-11/12'>
                    <div className='flex flex-col mx-5'>
                      <div className='flex flex-row my-2 dark:!text-white'>
                        <p className='font-semibold mr-2'> Zona:</p>
                        <p className='font-medium'> {sp.zone} </p>
                      </div>
                      <div className='flex flex-row my-2 dark:!text-white'>
                        <p className='font-semibold mr-2'> Dirección:</p>
                        <p className='font-medium'> {sp.address} </p>
                      </div>
                      <div className='flex flex-row my-2 dark:!text-white'>
                        <p className='font-semibold mr-2'> Teléfono:</p>
                        <p className='font-medium'> {sp.phone} </p>
                      </div>

                    </div>
                    <div className='self-end text-xl font-michelin underline text-white'>
                      <Bluebutton
                        myText='Iniciar Recorrido'
                        method={startPreparation}
                      />
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
