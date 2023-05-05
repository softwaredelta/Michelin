import InfoAccordion from '../../components/InfoAccordion'
import QuestionOverview from './questions/QuestionOverview'
import { HiDocumentText } from 'react-icons/hi'

const Section = ({ idSection, sectionTitle }) => {
  const content = (
    <>
      <InfoAccordion
        icon={
          <HiDocumentText
            size={40}
            className='fill-zinc-500 dark:fill-gray-100'
          />
        }
        sectionTitle={
          <div className='flex flex-col text-center text-2xl font-semibold  justify-center'>
            {sectionTitle}
          </div>
        }
        content={<QuestionOverview category={1} section={idSection} />}
      />
    </>
  )

  return content
}

export default Section
