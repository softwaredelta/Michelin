import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAddNewQuestionMutation } from '../../../services/questionApiSlice'
import { useGetAreasBySectionQuery } from '../../../services/sectionApiSlice'
import { Checkbox, Select, Label, Modal, Textarea } from 'flowbite-react'
import { ModalHeader } from 'flowbite-react/lib/esm/components/Modal/ModalHeader'
import { ModalBody } from 'flowbite-react/lib/esm/components/Modal/ModalBody'
import { ModalFooter } from 'flowbite-react/lib/esm/components/Modal/ModalFooter'
import Toast from '../../../components/alerts/Toast'
import { useForm } from 'react-hook-form'

/*
 * Link a requerimientos funcionales:
 * https://docs.google.com/spreadsheets/d/1Eme0YIj9GZCc3QCBQehDUGZIgS7aTilZx4oUy35dcGc/edit?usp=sharing
 */
// M4_H3
const QuestionAdd = ({ show, onClose, section, myCategory }) => {
  const { register, getValues, reset } = useForm()

  const navigate = useNavigate()

  const [addNewQuestion, {
    isSuccess,
    isError,
    error
  }] = useAddNewQuestionMutation()

  const {
    data: areas,
    isLoading: isLoadingArea,
    isSuccess: isSuccessArea,
    isError: isErrorArea
  } = useGetAreasBySectionQuery({ idSection: section })

  let area

  /**
   * This function saves a new question by getting values from form inputs and sending them to the server.
   * @param e - The "e" parameter is an event object that represents the click that triggered the function.
   */
  const onSaveQuestionClicked = async (e) => {
    e.preventDefault()
    const qText = getValues('qText')
    const idArea = getValues('idArea')
    const usingCamera = Number(getValues('usingCamera'))
    const btnNa = Number(getValues('btnNa'))
    const idCategory = myCategory

    const newQuestion = new FormData()
    newQuestion.append('qText', qText)
    newQuestion.append('idArea', idArea)
    newQuestion.append('usingCamera', usingCamera)
    newQuestion.append('btnNa', btnNa)
    newQuestion.append('placeholder', '')
    newQuestion.append('idCategory', idCategory)
    onClose()
    await addNewQuestion(newQuestion)
  }

  if (isLoadingArea) area = <option disabled value=''> Cargando... </option>

  if (isErrorArea) {
    area = <option disabled selected value=''> Sin opciones válidas </option>
  }

  if (isSuccessArea) {
    const { ids, entities } = areas
    const listContent = ids?.length
      ? ids.map((idArea) => (
        <option key={idArea} value={idArea}>{entities[idArea].area_title}</option>
      ))
      : null

    area = listContent
  }

  useEffect(() => {
    if (isError) {
      Toast.fire({
        icon: 'error',
        title: 'Se produjo un error'
      })
    }

    if (isSuccess) {
      reset()
      Toast.fire({
        icon: 'success',
        title: 'Se creó una nueva pregunta'
      })
    }
  }, [isSuccess, isError, error, reset, navigate])

  const content = (
    <>
      <Modal show={show} onClose={onClose} dismissible>
        <ModalHeader className='!bg-blues-200'>
          <div className='flex ml-14'>
            <div className='flex items-center flex-col mx-4 text-2xl font-semibold text-white'>
              Nueva Pregunta
            </div>
          </div>
        </ModalHeader>
        <form onSubmit={onSaveQuestionClicked}>
          <ModalBody>
            <div className='flex justify-center'>
              <div className='flex flex-col w-3/4'>
                <div className='flex flex-row items-center'>
                  <Label
                    htmlFor='qText'
                    value='Pregunta'
                    className='text-lg font-semibold mr-2 my-1'
                  />
                </div>

                <Textarea
                  id='qText'
                  {...register('qText')}
                  name='qText'
                  required
                  autoComplete='off'
                  className='border-2 rounded-md my-2 resize-none p-2'
                  maxLength='255'
                  rows='4'
                />
                <div className='flex flex-row'>
                  <Label
                    htmlFor='idArea'
                    value='Área'
                    className='align-bottom mr-2 my-1 text-lg font-semibold'
                  />
                </div>
                <Select
                  id='idArea'
                  name='idArea'
                  {...register('idArea')}
                  required
                  className='rounded-md my-2 dark:border-2'
                >
                  <option value='' selected> Selecciona una opción </option>
                  {area}
                </Select>
                <Label
                  value='Agregados'
                  className='align-bottom my-2 text-lg font-semibold'
                />
                <div className='flex flex-row my-1 justify-center'>
                  <div className='flex-col mx-2'>
                    <div className='flex flex-row'>

                      <Label htmlFor='usingCamara' className='align-top text-center text-lg font-semibold mr-3'>
                        Uso de cámara
                      </Label>

                      <Checkbox id='usingCamera' {...register('usingCamera')} name='usingCamera' value={1} uncheckedvalue={0} className='align-center accent-blues-150 scale-150 my-1' />

                    </div>
                  </div>
                  <div className='flex-col'>
                    <div className='flex flex-row'>

                      <Label htmlFor='btnNa' className='align-top text-center text-lg font-semibold ml-2 mr-3'>
                        Botón No Aplica
                      </Label>

                      <Checkbox id='btnNa' {...register('btnNa')} name='btnNa' value={1} uncheckedvalue={0} className='align-center scale-150 my-1 accent-blues-150' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter className='justify-end'>
            <button
              className='bg-blues-200 text-white font-semibold py-2 px-4 rounded-md dark:hover:text-trademark-50'
              title='Create'
              type='submit'
            >
              Crear
            </button>
            <a
              className='bg-gray-500 text-white py-2 px-4 rounded-md cursor-pointer font-semibold dark:hover:text-trademark-50'
              onClick={onClose}
              href={onClose}
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
