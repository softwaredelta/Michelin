import CurrentForm from "../../../services/CurrentForm"
import { Button } from "flowbite-react"


const Preparation = () => {
let Form = CurrentForm.getInstance()
const areas = Form.getAreasBySection(1)
let questions
let listContent

 for (let i = 0; i < areas.length; i++) {
     questions = Form.getQuestionsByArea(1,i)
     listContent = questions?.length
     ? questions.map((question) => (
       <div key={question.idQuestion}>{question.questionText}</div>
     ))
     : null 
}


    
  const content = (
    <>
    <div>
        {listContent}
    </div>

    </>
  )
  return content
}

export default Preparation
