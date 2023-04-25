import { Checkbox } from 'flowbite-react'
import { TableRow } from 'flowbite-react/lib/esm/components/Table/TableRow'
import { TableCell } from 'flowbite-react/lib/esm/components/Table/TableCell'
import { useEditQuestionMutation } from '../categoryApiSlice'
import { useEffect, useState } from 'react'
import Toast from '../../../components/Toast'

const Question = ({ triggerEdit, idQuestion, qOrder, qText, camera, btnNaInitial, areaTitle }) => {
  const [questionText, setQText] = useState(qText)
  const [usingCamera, setUsingCamera] = useState(camera)
  const [btnNa, setBtnNa] = useState(btnNaInitial)

  const [editQuestion, { isSuccess }] = useEditQuestionMutation()

  const onQuestionTextChanged = e => setQText(e.target.value)
  const onCameraChanged = e => setUsingCamera(e.target.checked)
  const onBtnNaChanged = e => setBtnNa(e.target.checked)

  useEffect(() => {
    if (triggerEdit) {
      const onEditQuestionsClicked = async (e) => {
        await editQuestion({
          questionText,
          usingCamera,
          btnNa,
          idQuestion
        })
      }

      onEditQuestionsClicked()
    }
  }, [triggerEdit, questionText, usingCamera, btnNa, idQuestion, editQuestion])

  useEffect(() => {
    if (isSuccess) {
      Toast.fire({
        icon: 'success',
        title: 'Los cambios han sido guardados'
      })
    }
  }, [isSuccess])

  return (

    <TableRow key={idQuestion} className='border-b'>

      <TableCell className='text-center'>{qOrder}</TableCell>
      <TableCell className='text-center'>{areaTitle}</TableCell>
      <TableCell className='text-center'><input type='text' value={questionText} onChange={onQuestionTextChanged} /></TableCell>
      <TableCell className='text-center'>
        <Checkbox className='scale-110' value={usingCamera} uncheckedvalue={0} checked={usingCamera} onChange={onCameraChanged} />
      </TableCell>
      <TableCell className='text-center'>
        <Checkbox key={idQuestion} className='scale-110' value={btnNa} uncheckedvalue={0} checked={btnNa} onChange={onBtnNaChanged} />
      </TableCell>
    </TableRow>
  )
}

export default Question
