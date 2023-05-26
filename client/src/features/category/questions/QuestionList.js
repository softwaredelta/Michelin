import { useState } from 'react'
import ModifiedFooter from '../../../components/ModifiedFooter'
import NavBar from '../../../components/NavBar'
import Header from '../../../components/Header'
import Bluebutton from '../../../components/Bluebutton'
import QuestionAdd from './QuestionAdd'
import { useParams } from 'react-router'
import { useGetQuestionsBySectionQuery } from './questionApiSlice'
import Question from './Question'
import { Button, Table } from 'flowbite-react'
import { TableHead } from 'flowbite-react/lib/esm/components/Table/TableHead'
import { TableHeadCell } from 'flowbite-react/lib/esm/components/Table/TableHeadCell'
import { TableBody } from 'flowbite-react/lib/esm/components/Table/TableBody'
import { useNavigate } from 'react-router-dom'
import { TableCell } from 'flowbite-react/lib/esm/components/Table/TableCell'
import { RiSaveFill } from 'react-icons/ri'
import { MdOutlineCancel, MdArrowBackIosNew } from 'react-icons/md'

const QuestionList = () => {
  const navigate = useNavigate()

  const [show, setShow] = useState(false)
  const [triggerEdit, setTriggerEdit] = useState(0)

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

  let questions

  if (isLoadingQuestions) questions = <div> Cargando... </div>

  if (isErrorQuestions) {
    questions = (
      <TableCell className='col-span-5'>
        No hay conexión con la base de datos
      </TableCell>
    )
  }

  if (isSuccessQuestions) {
    const { ids, entities } = questionData
    const listContent = ids?.length
      ? ids.map((idQuestion) => (
        <Question
          key={idQuestion}
          triggerEdit={triggerEdit}
          setTriggerEdit={setTriggerEdit}
          idQuestion={idQuestion}
          qOrder={entities[idQuestion].q_order}
          qText={entities[idQuestion].p_text}
          camera={entities[idQuestion].camera}
          btnNaInitial={entities[idQuestion].btn_na}
          areaTitle={entities[idQuestion].area_title}
          idCategory={category}
        />
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
        <div className='pt-20 w-full h-screen flex flex-col items-center dark:!bg-blues-400 overflow-y-scroll'>
          <Header myText='Preguntas' />
          <div className='flex flex-row w-full justify-between my-2 py-4'>
            <div className='flex flex-col'>
              <div
                onClick={() => navigate('/question')}
                className='flex flex-row items-center text-md font-semibold text-blues-200 cursor-pointer ml-5 hover:text-gray-500 dark:text-white dark:hover:text-trademark-50'
              >
                <MdArrowBackIosNew size={17} className='mr-1' /> Regresar
              </div>
            </div>
            <div className='flex flex-col mr-5'>
              <Bluebutton myText='+ Nueva Pregunta' method={handleSetShow} />
            </div>
          </div>
          <div className='container justify-items-stretch w-max-full h-3/5 overflow-y-scroll border'>
            <Table className='table-full'>
              <TableHead>
                <TableHeadCell className='text-center'>Orden</TableHeadCell>
                <TableHeadCell className='text-center'>Área</TableHeadCell>
                <TableHeadCell className='text-center'>Pregunta</TableHeadCell>
                <TableHeadCell className='text-center'>
                  Evidencia con cámara
                </TableHeadCell>
                <TableHeadCell className='text-center'>
                  Botón no aplica
                </TableHeadCell>
                <TableHeadCell />
              </TableHead>
              <TableBody className='h-3/5'>{questions}</TableBody>
            </Table>
          </div>
          <div className='justify-end my-8'>
            <div className='flex flex-row'>
              <Button
                className='!bg-gray-500 mr-3 hover:!bg-gray-700 dark:hover:!bg-gray-500 dark:hover:!text-trademark-50 font-semibold'
                onClick={() => navigate('/question')}
              >
                <MdOutlineCancel className='mr-2' /> Cancelar
              </Button>
              <Button
                className='!bg-blues-200 hover:!bg-blue-900 dark:hover:!text-trademark-50 dark:hover:!bg-blues-200 font-semibold'
                onClick={handleEdit}
              >
                <RiSaveFill className='mr-2' /> Guardar Cambios
              </Button>
            </div>
          </div>
          <ModifiedFooter />
        </div>
      </div>
      <QuestionAdd
        show={show}
        onClose={handleClose}
        section={section}
        myCategory={category}
      />
    </>
  )
  return content
}

export default QuestionList
