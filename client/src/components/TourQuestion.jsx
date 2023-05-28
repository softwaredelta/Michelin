import AnsButtons from './AnsButtons'

const TourQuestion = ({ question, area, section, index }) => {
  const content = (
    <>
        <p className='dark:text-white italic text-2xl text-center'> {question.questionText}</p>
        <AnsButtons question={question} area={area} section={section} index={index} />
    </>
  )
  return content
}
export default TourQuestion
