import { useState } from 'react'
import ModifiedFooter from '../../../components/ModifiedFooter'
import NavBar from '../../../components/NavBar'
import Header from '../../../components/Header'
import Bluebutton from '../../../components/Bluebutton'
import QuestionAdd from './QuestionAdd'
import { Navigate } from 'react-router-dom'

const QuestionList = () => {
  const [show, setShow] = useState(false)

  const handleSetShow = () => {
    setShow(true)
  }

  const handleClose = () => {
    setShow(false)
  }

  const content = (
    <>
      <div>
        <NavBar />
        <div className='pt-20 w-full h-screen flex flex-col items-center'>
          <Header myText='Preguntas' />
          <div className='self-end mr-5'>
            <Bluebutton
              myText='+ Nueva Pregunta'
              method={handleSetShow}
            />
          </div>
          <div className='container flex flex-wrap justify-items-stretch' />
          <ModifiedFooter />
        </div>
      </div>
      <QuestionAdd show={show} onClose={handleClose} />
    </>
  )
  return content
}

export default QuestionList
