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
  const [idArea, setArea] = useState(1)
  const [usingCamera, setUsingCamera] = useState(0)
  const [btnNa, setbtnNa] = useState(0)
  const [idCategory] = useState(1)
  const [placeholder, setPlaceHolder] = useState(null)

  useEffect(() => {
    if (isSuccess) {
      setqText('')
      setArea('')
      setUsingCamera(0)
      setbtnNa(0)
      navigate('/')
    }
  }, [isSuccess, navigate])

  const onqTextChanged = e => setqText(e.target.value)
  const onAreaChanged = e => { setArea(e.target.value) }
  const onUsingCameraChanged = e => setUsingCamera(e.target.checked ? 1 : 0)
  const onbtnNaChanged = e => { setbtnNa(e.target.checked ? 1 : 0) }
  const onPlaceHolderChanged = e => { setPlaceHolder(e.target.files[0]) }

  const onSaveQuestionClicked = async (e) => {
    e.preventDefault()
    const newQuestion = new FormData()
    newQuestion.append('qText', qText)
    newQuestion.append('idArea', idArea)
    newQuestion.append('usingCamera', usingCamera)
    newQuestion.append('btnNa', btnNa)
    newQuestion.append('placeholder', placeholder)
    newQuestion.append('idCategory', idCategory)
    await addNewQuestion(newQuestion)
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
            id='idArea'
            name='idArea'
            required
            onChange={onAreaChanged}
            value={idArea}
          >
            <option value={1} defaultValue={1}>Exterior</option>
            <option value={2}>Interior</option>
          </Select>
        </div>
        <Checkbox id='usingCamera' name='usingCamera' onClick={onUsingCameraChanged} value={1} uncheckedvalue={0} />
        <Label htmlFor='usingCamara'>
          Camára
        </Label>

        <Checkbox id='btnNa' name='btnNa' onClick={onbtnNaChanged} value={1} uncheckedvalue={0} />
        <Label htmlFor='btnNa'>
          Botón No Aplica
        </Label>

        <div id='fileUpload'>
          <div className='mb-2 block'>
            <Label
              htmlFor='placeholder'
              value='Sube la imagen de ejemplo'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            />
          </div>
          <FileInput
            id='placeholder'
            name='placeholder'
            className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
            onChange={onPlaceHolderChanged}
            accept='.jpg, .jpeg'
          />
        </div>
      </form>
    </>
  )
  return content
}

export default QuestionAdd
