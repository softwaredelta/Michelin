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
      setUsingCamera(0)
      setbtnNa(0)
      setPlaceHolder('')
      window.location.reload()
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
        <form className='flex flex-col gap-4' name='newQuestionForm'>
          <ModalBody>
            <div className='flex justify-center'>
              <div className='flex flex-col mx-4 items-end'>
                <Label
                  htmlFor='qText'
                  value='Texto de Pregunta'
                  className='flex-row align-bottom text-center my-2 text-lg font-semibold'
                />
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

              <div className='flex flex-col w-3/4'>
                <select className='border-2 rounded-md my-2'>{area}</select>

                <Checkbox id='usingCamera' name='usingCamera' onClick={onUsingCameraChanged} value={1} uncheckedvalue={0} />
                <Label htmlFor='usingCamara'>
                  Camára
                </Label>

                <Checkbox id='btnNa' name='btnNa' onClick={onbtnNaChanged} value={1} uncheckedvalue={0} />
                <Label htmlFor='btnNa'>
                  Botón No Aplica
                </Label>
              </div>
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
