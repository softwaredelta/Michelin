import InfoAccordion from '../../components/InfoAccordion'
import QuestionOverview from './questions/QuestionOverview'
import { HiDocumentText } from 'react-icons/hi'

const Section = ({ idSection, sectionTitle }) => {
  const content = (
    <>
      <InfoAccordion
        icon={<HiDocumentText size={40} className='fill-zinc-500' />}
        sectionTitle={sectionTitle}
        content={<QuestionOverview category={1} section={idSection} />}
      />
    </>
  )

  return content
}

export default Section
