import InfoAccordion from '../../components/InfoAccordion'
import QuestionOverview from './questions/QuestionOverview'
import { HiDocumentText } from 'react-icons/hi'

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
