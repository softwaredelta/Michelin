import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAddNewQuestionMutation } from '../categoryApiSlice'
import { Checkbox, Select, Label, TextInput, FileInput } from 'flowbite-react'

const QuestionAdd = () => {
  const [addNewQuestion, {
    // isLoading,
    isSuccess
  }] = useAddNewQuestionMutation()

  const navigate = useNavigate()

  const [qText, setqText] = useState('')
  const [section, setSection] = useState(1)
  const [usingCamera, setUsingCamera] = useState(1)
  const [btnNa, setbtnNa] = useState(0)
  const [idCategory] = useState(1)
  const [questionOrder, setQuestionOrder] = useState(1)
  // const [originalname, setOriginalName] = useState('holi.jpg')

  useEffect(() => {
    if (isSuccess) {
      setqText('')
      setSection('')
      setUsingCamera(0)
      setbtnNa(0)
      navigate('/')
    }
  }, [isSuccess, navigate])

  const onqTextChanged = e => setqText(e.target.value)
  const onSectionChanged = e => setSection(e.target.value)
  const onUsingCameraChanged = e => setUsingCamera(e.target.value)
  const onbtnNaChanged = e => setbtnNa(e.target.value)
  const onOrderChanged = e => setQuestionOrder(e.target.value)

  const onSaveQuestionClicked = async (e) => {
    e.preventDefault()
    await addNewQuestion({ qText, section, usingCamera, btnNa, questionOrder, idCategory })
  }

  const content = (
    <>
      <form onSubmit={onSaveQuestionClicked} className='flex flex-col gap-4'>
        <h2>New Question</h2>
        <button title='Save'>Save</button>
        <div>
          <div className='mb-2 block'>
            <Label
              htmlFor='qText'
              value='Texto de Pregunta'
            />
          </div>
          <TextInput
            id='qText'
            name='qText'
            autoComplete='off'
            required
            sizing='lg'
            value={qText}
            onChange={onqTextChanged}
          />
        </div>
        <div>
          <div className='mb-2 block'>
            <Label
              htmlFor='section'
              value='Sección'
            />
          </div>
          <Select
            id='section'
            name='section'
            autoComplete='off'
            required
            // value={section}
            onChange={onSectionChanged}
          >
            <option value={1}>Exterior</option>
            <option value={2}>Interior</option>
          </Select>
        </div>
        <div>
          <div className='mb-2 block'>
            <Label
              htmlFor='questionOrder'
              value='Orden de Pregunta'
            />
          </div>
          <Select
            id='questionOrder'
            name='questionOrder'
            required
            // value={questionOrder}
            onChange={onOrderChanged}
          >
            <option value={1} defaultValue={1}>Llantas</option>
            <option value={2}>Papilla</option>
          </Select>
        </div>
        <Checkbox id='usingCamara' name='usingCamara' value={usingCamera} onClick={onUsingCameraChanged} datatype='int' />
        <Label htmlFor='usingCamara'>
          Camára
        </Label>

        <Checkbox id='btnNa' name='btnNa' onChange={onbtnNaChanged} value={btnNa} datatype='int' />
        <Label htmlFor='btnNa'>
          Botón No Aplica
        </Label>

        <div id='fileUpload'>
          <div className='mb-2 block'>
            <Label
              htmlFor='file'
              value='Upload file'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            />
          </div>
          <FileInput
            id='file'
            helperText='Placeholder Image'
            className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
          />
        </div>
      </form>
    </>
  )
  return content
}

export default QuestionAdd
