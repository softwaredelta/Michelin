import { AccordionContent } from 'flowbite-react/lib/esm/components/Accordion/AccordionContent'
import { AiFillFilePdf } from 'react-icons/ai'
import GradeChart from '../../components/inputs/GradeChart'

const ReportOverview = ({
  name,
  time,
  repLink,
  intPercentage,
  extPercentage,
  clientPercentage,
  managerPercentage
}) => {
  const content = (
    <>
      <AccordionContent className='h-40 dark:!bg-slate-700 !bg-white'>
        <form>
          <div className='flex w-full justify-between mr-80'>
            <div className='flex flex-row justify-between lg:w-11/12'>
              <div className='flex flex-col mx-5'>
                <div className='flex flex-row my-2 dark:!text-white'>
                  <p className='font-semibold mr-2'> TBM Asignado:</p>
                  <p className='font-medium'> {name} </p>
                </div>
                <div className='flex flex-row my-2 dark:!text-white'>
                  <p className='font-semibold mr-2'> Tiempo:</p>
                  <p className='font-medium'> {time} </p>
                </div>
                <a href={repLink} target='_blank' rel='noreferrer'>
                  <div className='flex flex-row w-9/12 my-2 font-semibold dark:!text-white border-b border-black dark:!border-white cursor-pointer'>
                    Ver Reporte PDF
                    <AiFillFilePdf className='ml-2 my-1' />
                  </div>
                </a>
              </div>
              <div className='flex flex-col'>
                <GradeChart percent={intPercentage} zone='Interior' />
              </div>
              <div className='flex flex-col'>
                <GradeChart percent={extPercentage} zone='Exterior' />
              </div>
              <div className='flex flex-col'>
                <GradeChart percent={clientPercentage} zone='Cliente' />
              </div>
              <div className='flex flex-col'>
                <GradeChart percent={managerPercentage} zone='Gerente' />
              </div>
            </div>
          </div>
        </form>
      </AccordionContent>
    </>
  )
  return content
}

export default ReportOverview
