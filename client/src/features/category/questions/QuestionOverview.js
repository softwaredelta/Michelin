import { Button, Checkbox, Table } from 'flowbite-react'
import { AccordionContent } from 'flowbite-react/lib/esm/components/Accordion/AccordionContent'
import { TableHead } from 'flowbite-react/lib/esm/components/Table/TableHead'
import { useGetQuestionsBySectionQuery } from '../categoryApiSlice'
import { TableHeadCell } from 'flowbite-react/lib/esm/components/Table/TableHeadCell'
import { TableBody } from 'flowbite-react/lib/esm/components/Table/TableBody'
import { TableRow } from 'flowbite-react/lib/esm/components/Table/TableRow'
import { TableCell } from 'flowbite-react/lib/esm/components/Table/TableCell'
import { MdModeEditOutline } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const QuestionOverview = ({ category, section }) => {
  let questions
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

  if (isLoadingQuestions) questions = <div> Cargando... </div>
  if (isErrorQuestions) {
    questions = <TableRow> Sin opciones válidas... </TableRow>
  }

  if (isSuccessQuestions) {
    const { ids, entities } = questionData
    const listContent = ids?.length
      ? ids.map((idQuestion) => (
        <TableRow key={idQuestion} className='border-b'>
          <TableCell className='text-center'>
            {entities[idQuestion].q_order}
          </TableCell>
          <TableCell className='text-center'>
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
      <AccordionContent className='h-96 overflow-y-scroll'>
        <div className=''>
          <Table>
          <TableHead>
            <TableHeadCell className='text-center'>Orden</TableHeadCell>
            <TableHeadCell className='text-center'>Pregunta</TableHeadCell>
            <TableHeadCell className='text-center'>
              Evidencia con cámara
            </TableHeadCell>
            <TableHeadCell className='text-center'>
              Botón no aplica
            </TableHeadCell>
          </TableHead>
          <TableBody>{questions}</TableBody>
        </Table>
        </div>
        <div className=' flex flex-row justify-end my-10'>
          <Button className='!bg-zinc-500' onClick={() => navigate(`/question/edit/${category}/${section}`)}> <MdModeEditOutline className='mx-2' /> Editar Cuestionario </Button>
        </div>
      </AccordionContent>
    </>
  )
  return content
}

export default QuestionOverview
