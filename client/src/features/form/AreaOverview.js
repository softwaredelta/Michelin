import CurrentForm from '../../services/CurrentForm'
import { useState } from 'react'
import TourQuestion from '../../components/accordions/TourQuestion'
// import AreaAccordion from '../../components/accordions/AreaAccordion'
import AreaCard from '../../components/cards/AreaCard'

const AreaOverview = ({ section, area, index, method }) => {
  const Form = CurrentForm.getInstance()

  const questions = Form.getQuestionsByArea(section, index)

  const [answerCount, setAnswerCount] = useState(Form.getAnsweredQuestionsByArea(section, index))

  const listContent = questions?.length
    ? (
        questions.map((question, id) => (
          <>
            <TourQuestion
              key={question.idQuestion}
              question={question}
              area={index}
              section={section}
              index={id}
              setAnswerCount={setAnswerCount}
            />
            <div class='relative py-4'>
              <div class='absolute inset-0 flex items-center justify-center'>
                <div class='w-10/12 border-b border-gray-300' />
              </div>
              <div class='relative flex justify-center'>
                <span class='bg-white px-4 text-sm text-gray-500' />
              </div>
            </div>
          </>
        ))
      )
    : (
      <p className='dark:text-black italic text-2xl text-center'>
        {' '}
        No hay preguntas en esta área
      </p>
      )

  const content = (
    <AreaCard areaTitle={area.areaTitle} index={index} questionContent={listContent} />
  )

  return content
}

export default AreaOverview
