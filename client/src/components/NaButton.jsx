import { useState } from "react"
import CurrentForm from "../services/CurrentForm"

const NaButton = ({section, area, index, buttonNa}) => {

  let Form = CurrentForm.getInstance()
  let disable = false

  const myFunction =() =>{
    Form.setAnswer(section, area, index, 3)
    console.log(Form.questions)
  }

  const content = (
    <>
      <button className='scale-50 hover:opacity-40' disabled={disable} onClick={myFunction}><img src='/images/naButton.png' /></button>
    </>
  )
  return content
}
export default NaButton
