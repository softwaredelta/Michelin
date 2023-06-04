import { Button, Checkbox, Table } from 'flowbite-react'
import { AccordionContent } from 'flowbite-react/lib/esm/components/Accordion/AccordionContent'
import { TableHead } from 'flowbite-react/lib/esm/components/Table/TableHead'
import { useGetQuestionsBySectionQuery } from './questionApiSlice'
import { TableHeadCell } from 'flowbite-react/lib/esm/components/Table/TableHeadCell'
import { TableBody } from 'flowbite-react/lib/esm/components/Table/TableBody'
import { TableRow } from 'flowbite-react/lib/esm/components/Table/TableRow'
import { TableCell } from 'flowbite-react/lib/esm/components/Table/TableCell'
import { MdModeEditOutline } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
/*
 * Link a requerimientos funcionales:
 * https://docs.google.com/spreadsheets/d/1Eme0YIj9GZCc3QCBQehDUGZIgS7aTilZx4oUy35dcGc/edit?usp=sharing
 */
// M4_H1
const QuestionOverview = ({ category, section }) => {
  const navigate = useNavigate()

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
    questions = <TableRow> Sin opciones válidas... </TableRow>
  }

  if (isSuccessQuestions) {
    const { ids, entities } = questionData
    const listContent = ids?.length
      ? ids.map((idQuestion) => (
        <TableRow key={idQuestion} className='border-b'>
          <TableCell className='text-center dark:text-white'>
            {entities[idQuestion].q_order}
          </TableCell>
          <TableCell className='text-center max-w-md break-words dark:text-white'>
            {entities[idQuestion].p_text}
          </TableCell>
          <TableCell className='text-center'>
            <Checkbox
              key={idQuestion}
              className='scale-110'
              checked={entities[idQuestion].camera}
              disabled
            />
          </TableCell>
          <TableCell className='text-center'>
            <Checkbox
              key={idQuestion}
              className='scale-110'
              checked={entities[idQuestion].btn_na}
              disabled
            />
          </TableCell>
        </TableRow>
      ))
      : null

    questions = listContent
  }

  const content = (
    <>
      <AccordionContent className='h-96 overflow-y-scroll bg-gradient-to-b from-white to-gray-100 dark:!bg-gradient-to-b dark:!from-blues-500 dark:!to-blues-500'>
        <div className=''>
          <Table>
            <TableHead className=''>
              <TableHeadCell className='text-center dark:text-white'>
                Orden
              </TableHeadCell>
              <TableHeadCell className='text-center dark:text-white'>
                Pregunta
              </TableHeadCell>
              <TableHeadCell className='text-center dark:text-white'>
                Evidencia con cámara
              </TableHeadCell>
              <TableHeadCell className='text-center dark:text-white'>
                Botón no aplica
              </TableHeadCell>
            </TableHead>
            <TableBody>{questions}</TableBody>
          </Table>
        </div>
        <div className=' flex flex-row justify-end my-10'>
          <Button
            className='!bg-zinc-500 dark:!bg-blues-200 dark:hover:!bg-gray-500'
            onClick={() => navigate(`/question/edit/${category}/${section}`)}
          >
            {' '}
            <MdModeEditOutline className='mx-2' /> Editar Cuestionario{' '}
          </Button>
        </div>
      </AccordionContent>
    </>
  )
  return content
}

export default QuestionOverview
