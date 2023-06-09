import InfoAccordion from '../../components/accordions/InfoAccordion'
import QuestionOverview from './questions/QuestionOverview'
import { HiDocumentText } from 'react-icons/hi'
/*
 * Link a requerimientos funcionales:
 * https://docs.google.com/spreadsheets/d/1Eme0YIj9GZCc3QCBQehDUGZIgS7aTilZx4oUy35dcGc/edit?usp=sharing
 */
// M4_H1
const Section = ({ idSection, sectionTitle }) => {
  const content = (
    <>
      <div className='flex-row w-11/12 mx-auto'>
        <InfoAccordion
          icon={
            <HiDocumentText
              size={40}
              className='fill-zinc-500 dark:fill-gray-100'
            />
          }
          sectionTitle={
            <div className='text-center text-2xl font-semibold justify-center dark:!text-white'>
              {sectionTitle}
            </div>
          }
          accordionContent={
            <QuestionOverview category={1} section={idSection} />
          }
        />
      </div>
    </>
  )
  return content
}

export default Section
