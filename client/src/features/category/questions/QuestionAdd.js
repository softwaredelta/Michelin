import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAddNewQuestionMutation, useGetAreaQuery } from '../categoryApiSlice'
import { Checkbox, Select, Label, TextInput, FileInput, Modal } from 'flowbite-react'
import { ModalHeader } from 'flowbite-react/lib/esm/components/Modal/ModalHeader'
import { ModalBody } from 'flowbite-react/lib/esm/components/Modal/ModalBody'
import { ModalFooter } from 'flowbite-react/lib/esm/components/Modal/ModalFooter'
import AreaOption from './AreaOption'

const QuestionAdd = ({ show, onClose }) => {
  const [addNewQuestion, {
    isSuccess
  }] = useAddNewQuestionMutation()

  const navigate = useNavigate()

  const [qText, setqText] = useState('')
  const [idArea, setArea] = useState(1)
  const [usingCamera, setUsingCamera] = useState('')
  const [btnNa, setbtnNa] = useState('')
  const [idCategory] = useState(1)
  const [placeholder, setPlaceHolder] = useState('')

  useEffect(() => {
    if (isSuccess) {
      setqText('')
      setArea(1)
      setUsingCamera('')
      setbtnNa('')
      setPlaceHolder('')
      window.location.reload()
    }
  }, [isSuccess, navigate])

  const onqTextChanged = e => { setqText(e.target.value) }
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
    onClose()
    await addNewQuestion(newQuestion)
  }

  let area

  const {
    data: areas,
    isLoading: isLoadingArea,
    isSuccess: isSuccessArea,
    isError: isErrorArea
  } = useGetAreaQuery()

  if (isLoadingArea) area = <option> Cargando </option>
  if (isErrorArea) {
    area = <option> Sin opciones válidas </option>
  }

  if (isSuccessArea) {
    const { ids } = areas
    const listContent = ids?.length
      ? ids.map((idArea) => (
        <AreaOption key={idArea} areaId={idArea} />
      ))
      : null
    area = listContent
  }
  const content = (
    <>
      <Modal show={show} onClose={onClose} dismissible>
        <ModalHeader className='!bg-blues-200'>
          <div className='flex ml-14'>
            <div className='flex items-center flex-col mx-4 text-xl font-semibold text-white'>
              Nueva Pregunta
            </div>
          </div>
        </ModalHeader>
        <form name='newQuestionForm'>
          <ModalBody>
            <div className='flex justify-center'>
              <div className='flex flex-col w-3/4'>
                <Label
                  htmlFor='qText'
                  value='Texto de Pregunta'
                  className='align-bottom my-2 text-lg font-semibold'
                />
                <TextInput
                  id='qText'
                  name='qText'
                  autoComplete='off'
                  required
                  value={qText}
                  onChange={onqTextChanged}
                  className='border-2 rounded-md my-1 resize-none'
                />
                <Label
                  htmlFor='section'
                  value='Sección'
                  className='align-bottom my-2 text-lg font-semibold'
                />
                <Select
                  id='idArea'
                  name='idArea'
                  required
                  onChange={onAreaChanged}
                  value={idArea}
                  className='border-2 rounded-md my-1'
                >
                  <option value={1} defaultValue={1}>Exterior</option>
                  <option value={2}>Interior</option>
                </Select>
                <Label
                  value='Agregados'
                  className='align-bottom my-2 text-lg font-semibold'
                />

                <div className='flex flex-row -my-2 justify-center'>
                  <div className='flex-col mx-3'>
                    <Label htmlFor='usingCamara' className='align-bottom text-center text-lg font-semibold mx-2'>
                      Cámara
                    </Label>
                    <Checkbox id='usingCamera' name='usingCamera' onClick={onUsingCameraChanged} value={1} uncheckedvalue={0} />
                  </div>
                  <div className='flex-col'>
                    <Label htmlFor='btnNa' className='align-bottom text-center text-lg font-semibold mx-2'>
                      Botón No Aplica
                    </Label>
                    <Checkbox id='btnNa' name='btnNa' onClick={onbtnNaChanged} value={1} uncheckedvalue={0} />
                  </div>
                </div>
                <div className='flex-row my-2'>
                  <Label
                    htmlFor='placeholder'
                    value='Imagen para pregunta'
                    className='flex-row align-bottom text-center text-lg font-semibold'
                  />
                  <div id='fileUpload'>
                    <FileInput
                      id='placeholder'
                      name='placeholder'
                      className='border-2 rounded-md my-2.5'
                      onChange={onPlaceHolderChanged}
                      accept='.jpg, .jpeg'
                    />
                  </div>
                </div>
                <select className='border-2 rounded-md my-2'>{area}</select>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              className='bg-blues-200 text-white py-2 px-4 rounded-md'
              title='Create'
              type='submit'
              form='newQuestionForm'
              onClick={onSaveQuestionClicked}
            >
              Crear
            </button>
            <button
              className='bg-gray-500 text-white py-2 px-4 rounded-md'
              onClick={onClose}
            >
              Cancelar
            </button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  )
  return content
}

export default QuestionAdd
