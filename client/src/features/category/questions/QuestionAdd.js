import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAddNewQuestionMutation, useGetAreaQuery } from '../categoryApiSlice'
import { Checkbox, Select, Label, TextInput, FileInput, Modal } from 'flowbite-react'
import { ModalHeader } from 'flowbite-react/lib/esm/components/Modal/ModalHeader'
import { ModalBody } from 'flowbite-react/lib/esm/components/Modal/ModalBody'
import { ModalFooter } from 'flowbite-react/lib/esm/components/Modal/ModalFooter'
import AreaOption from './AreaOption'
import { useForm } from 'react-hook-form'

const QuestionAdd = ({ show, onClose }) => {
  const [addNewQuestion, {
    isSuccess
  }] = useAddNewQuestionMutation()

  const { register, getValues } = useForm()

  const navigate = useNavigate()

  const [placeholder, setPlaceHolder] = useState('')

  useEffect(() => {
    if (isSuccess) {
      window.location.reload()
    }
  }, [isSuccess, navigate])

  const onPlaceHolderChanged = e => { setPlaceHolder(e.target.files[0]) }

  const onSaveQuestionClicked = async (e) => {
    e.preventDefault()
    const qText = getValues('qText')
    const idArea = getValues('idArea')
    const usingCamera = getValues('usingCamera')
    const btnNa = getValues('btnNa')
    const idCategory = 1

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
        <form onSubmit={onSaveQuestionClicked}>
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
                  {...register('qText')}
                  name='qText'
                  required
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
                  {...register('idArea')}
                  required
                  className='border-2 rounded-md my-1'
                >
                  <option disabled selected value=''> Selecciona una opción</option>
                  {area}
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
                    <Checkbox id='usingCamera' {...register('usingCamera')} name='usingCamera' value={1} uncheckedvalue={0} />
                  </div>
                  <div className='flex-col'>
                    <Label htmlFor='btnNa' className='align-bottom text-center text-lg font-semibold mx-2'>
                      Botón No Aplica
                    </Label>
                    <Checkbox id='btnNa' {...register('btnNa')} name='btnNa' value={1} uncheckedvalue={0} />
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
                      required
                      className='border-2 rounded-md my-2.5'
                      onChange={onPlaceHolderChanged}
                      accept='.jpg, .jpeg'
                    />
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              className='bg-blues-200 text-white py-2 px-4 rounded-md'
              title='Create'
              type='submit'
            >
              Crear
            </button>
            <a
              className='bg-gray-500 text-white py-2 px-4 rounded-md cursor-pointer'
              onClick={onClose}
              href={() => {}}
            >
              Cancelar
            </a>
          </ModalFooter>
        </form>
      </Modal>
    </>
  )
  return content
}

export default QuestionAdd
