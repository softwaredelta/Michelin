import CurrentForm from '../services/CurrentForm'
import { useState } from 'react'
const GreenBibendum = ({
  section,
  area,
  index,
  disable,
  className,
  childtoParent
}) => {
  const Form = CurrentForm.getInstance()

  const myFunction = () => {
    Form.setAnswer(section, area, index, 1)
    childtoParent(1)
  }

  const content = (
    <>
      <button className={className} disabled={disable} onClick={myFunction}>
        <img src='/images/greenBibendum.png' />
      </button>
    </>
  )
  return content
}
export default GreenBibendum
