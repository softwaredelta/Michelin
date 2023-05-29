import { FileInput } from 'flowbite-react'
import CurrentForm from '../services/CurrentForm'
import { useState } from 'react'
const RedBibendum = ({
  section,
  area,
  index,
  img,
  photo,
  disable,
  className,
  childtoParent
}) => {
  const Form = CurrentForm.getInstance()
  let currImg

  const myFunction = () => {
    Form.setAnswer(section, area, index, 2)
    childtoParent(2)
  }

  if (img === true) {
    currImg = (
      <>
        <p className='dark:text-white'>La imagen se ha guardado</p>
      </>
    )
  }

  const content = (
    <>
      <button className={className} onClick={myFunction} disabled={disable}>
        <img src='/images/redBibendum.png' />
      </button>
      {photo}
      {currImg}
    </>
  )
  return content
}
export default RedBibendum
