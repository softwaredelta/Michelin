import { Checkbox, Textarea } from 'flowbite-react'
import { TableRow } from 'flowbite-react/lib/esm/components/Table/TableRow'
import { TableCell } from 'flowbite-react/lib/esm/components/Table/TableCell'
import {
  useDeleteQuestionMutation,
  useEditQuestionMutation
} from './questionApiSlice'
import { useEffect, useState } from 'react'
import Toast from '../../../components/Toast'
import SvgButton from '../../../components/SvgButton'
import { BsFillTrashFill } from 'react-icons/bs'
import ConfirmationModal from '../../../components/ConfirmationModal'

const Question = ({
  triggerEdit,
  setTriggerEdit,
  idQuestion,
  qOrder,
  qText,
  camera,
  btnNaInitial,
  areaTitle,
  idCategory
}) => {
  const confirmationText = '¿Estás seguro que deseas eliminar la pregunta?'

  const [deleteQuestion, { isSuccess: isSuccessDelete }] =
    useDeleteQuestionMutation()

  const [editQuestion, { isSuccess }] = useEditQuestionMutation()

  const [questionText, setQText] = useState(qText)
  const [usingCamera, setUsingCamera] = useState(camera)
  const [btnNa, setBtnNa] = useState(btnNaInitial)
  const [showDelete, setShowDelete] = useState(false)

  const onQuestionTextChanged = (e) => setQText(e.target.value)
  const onCameraChanged = (e) => setUsingCamera(e.target.checked)
  const onBtnNaChanged = (e) => setBtnNa(e.target.checked)

  const handleSetShowDelete = () => {
    setShowDelete(true)
  }

  const handleCloseDelete = () => {
    setShowDelete(false)
  }

  const deleteQ = async (idC, idQ, order) => {
    await deleteQuestion([{ idCategory: idC, idQuestion: idQ, order }])
  }

  useEffect(() => {
    if (triggerEdit === 1 && questionText !== '') {
      const onEditQuestionsClicked = async (e) => {
        await editQuestion({
          questionText,
          usingCamera,
          btnNa,
          idQuestion
        })
      }

      onEditQuestionsClicked()
      setTriggerEdit(0)
    }
  }, [
    triggerEdit,
    questionText,
    usingCamera,
    btnNa,
    idQuestion,
    editQuestion,
    setTriggerEdit
  ])

  useEffect(() => {
    if (isSuccess) {
      Toast.fire({
        icon: 'success',
        title: 'Los cambios han sido guardados'
      })
    }

    if (isSuccessDelete) {
      Toast.fire({
        icon: 'success',
        title: 'La pregunta fue borrada con éxito'
      })
    }
  }, [isSuccess, isSuccessDelete])

  const content = (
    <>
      <TableRow key={idQuestion} className='border-b'>
        <TableCell className='text-center'>{qOrder}</TableCell>
        <TableCell className='text-center'>{areaTitle}</TableCell>
        <TableCell className='text-center'>
          <Textarea
            className='border-2 rounded-md resize-none w-full'
            type='text'
            value={questionText}
            onChange={onQuestionTextChanged}
          />
          {questionText === '' && (
            <div className='text-xs text-red-700'>
              Esta pregunta no se va a guardar porque no tiene texto
            </div>
          )}
        </TableCell>
        <TableCell className='text-center'>
          <Checkbox
            className='scale-110 accent-blues-150'
            value={usingCamera}
            uncheckedvalue={0}
            checked={usingCamera}
            onChange={onCameraChanged}
          />
        </TableCell>
        <TableCell className='text-center'>
          <Checkbox
            key={idQuestion}
            className='scale-110 accent-blues-150'
            value={btnNa}
            uncheckedvalue={0}
            checked={btnNa}
            onChange={onBtnNaChanged}
          />
        </TableCell>
        <TableCell>
          <SvgButton
            svgfile={<BsFillTrashFill className='fill-blues-150' />}
            method={handleSetShowDelete}
          />
        </TableCell>
      </TableRow>
      <ConfirmationModal
        show={showDelete}
        onClose={handleCloseDelete}
        text={confirmationText}
        method={() => deleteQ(idCategory, idQuestion, qOrder)}
      />
    </>
  )
  return content
}

export default Question
