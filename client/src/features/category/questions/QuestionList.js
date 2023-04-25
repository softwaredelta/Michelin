import { useState } from 'react'
import ModifiedFooter from '../../../components/ModifiedFooter'
import NavBar from '../../../components/NavBar'
import Header from '../../../components/Header'
import Bluebutton from '../../../components/Bluebutton'
import QuestionAdd from './QuestionAdd'
import { useParams } from 'react-router'
import { useGetQuestionsBySectionQuery } from '../categoryApiSlice'
import Question from './Question'
import { Button, Table } from 'flowbite-react'
import { TableHead } from 'flowbite-react/lib/esm/components/Table/TableHead'
import { TableHeadCell } from 'flowbite-react/lib/esm/components/Table/TableHeadCell'
import { TableBody } from 'flowbite-react/lib/esm/components/Table/TableBody'

const QuestionList = () => {
  const [show, setShow] = useState(false)
  const [triggerEdit, setTriggerEdit] = useState(0)

  let questions

  const { section, category } = useParams()

  const {
    data: questionData,
    isLoading: isLoadingQuestions,
    isSuccess: isSuccessQuestions,
    isError: isErrorQuestions
  } = useGetQuestionsBySectionQuery({
    idCategory: category,
    idSection: section
  })

  if (isLoadingQuestions) questions = <div> Cargando... </div>
  if (isErrorQuestions) {
    questions = <div> Sin opciones válidas </div>
  }

  if (isSuccessQuestions) {
    const { ids, entities } = questionData
    const listContent = ids?.length
      ? ids.map((idQuestion) => (

        <Question key={idQuestion} triggerEdit={triggerEdit} setTriggerEdit={setTriggerEdit} idQuestion={idQuestion} qOrder={entities[idQuestion].q_order} qText={entities[idQuestion].p_text} camera={entities[idQuestion].camera} btnNaInitial={entities[idQuestion].btn_na} areaTitle={entities[idQuestion].area_title} idCategory={category} />

      ))
      : null
    questions = listContent
  }

  const handleSetShow = () => {
    setShow(true)
  }

  const handleClose = () => {
    setShow(false)
  }

  const handleEdit = () => {
    setTriggerEdit(1)
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
          <div className='container justify-items-stretch w-max-full'>
            <Table className='table-full'>
              <TableHead>
                <TableHeadCell className='text-center'>Orden</TableHeadCell>
                <TableHeadCell className='text-center'>Área</TableHeadCell>
                <TableHeadCell className='text-center'>Pregunta</TableHeadCell>
                <TableHeadCell className='text-center'>Evidencia con cámara</TableHeadCell>
                <TableHeadCell className='text-center'>Botón no aplica</TableHeadCell>
                <TableHeadCell />
              </TableHead>
              <TableBody>{questions}</TableBody>
            </Table>
          </div>
          <div className='justify-end my-4'>
            <Button className='!bg-green-700' onClick={handleEdit}> Guardar Cambios </Button>
          </div>
          <ModifiedFooter />
        </div>
      </div>
      <QuestionAdd show={show} onClose={handleClose} section={section} myCategory={category} />
    </>
  )
  return content
}

export default QuestionList
