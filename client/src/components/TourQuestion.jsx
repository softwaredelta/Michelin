import AnsButtons from './AnsButtons'

const TourQuestion = ({ question, area, section, index, setAnswerCount }) => {
  const content = (
    <>
      <p className='dark:text-white italic text-2xl text-center'> {question.questionText}</p>
      <AnsButtons question={question} area={area} section={section} index={index} setAnswerCount={setAnswerCount} />
    </>
  )
  return content
}
export default TourQuestion
