import { useState } from "react"
import CurrentForm from "../services/CurrentForm"

const NaButton = ({section, area, index, buttonNa}) => {

  let Form = CurrentForm.getInstance()
  const [disable,setDisable] = useState(false)
  const onClickAnswer = e => {
  setDisable(true)
  Form.setAnswer(section, area, index, 3)
  console.log(Form.questions["preparation"][area][index].answer)
  }
  const content = (
    <>
      <button className='scale-50' disabled={disable}><img src='/images/naButton.png' onClick={onClickAnswer()} /></button>
    </>
  )
  return content
}
export default NaButton
