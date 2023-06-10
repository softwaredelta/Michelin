import CurrentForm from '../../services/CurrentForm'
import { useState } from 'react'
import TourQuestion from '../../components/accordions/TourQuestion'
import AreaAccordion from '../../components/accordions/AreaAccordion'
// import AreaCard from '../../components/cards/AreaCard'

const AreaOverview = ({ section, area, index, method }) => {
  const Form = CurrentForm.getInstance()

  const questions = Form.getQuestionsByArea(section, index)

  const [answerCount, setAnswerCount] = useState(Form.getAnsweredQuestionsByArea(section, index))

  const listContent = questions?.length
    ? (
        questions.map((question, id) => (
          <TourQuestion
            key={question.idQuestion}
            question={question}
            area={index}
            section={section}
            index={id}
            setAnswerCount={setAnswerCount}
          />
        ))
      )
    : (
      <p className='dark:text-black italic text-2xl text-center'>
        No hay preguntas en esta área
      </p>
      )

  const content = (
    <AreaAccordion areaTitle={area.areaTitle} index={index} onClicked={method} questionCount={questions.length} questionContent={listContent} answerCount={answerCount} />
  )

  return content
}

export default AreaOverview
