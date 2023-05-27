import CurrentForm from "../services/CurrentForm"
import { useState } from "react"
const RedBibendum = ({section, area, index, camera}) => {
  let Form = CurrentForm.getInstance()
  const [disable,setDisable] = useState(false)
  const onClickAnswer = e => {
    setDisable(true)
    Form.setAnswer(section, area, index, 2)
  }
  const content = (
    <>
      <button className='scale-50 rounded-full bg-white bg-fixed opacity-100 transition duration-300 ease-in-out hover:opacity-40' disabled={disable}><img src='/images/redBibendum.png' onClick={onClickAnswer()} /></button>
    </>
  )
  return content
}
export default RedBibendum
