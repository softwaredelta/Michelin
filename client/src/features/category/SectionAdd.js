import { Modal } from 'flowbite-react'
import { ModalHeader } from 'flowbite-react/lib/esm/components/Modal/ModalHeader'
import { ModalBody } from 'flowbite-react/lib/esm/components/Modal/ModalBody'
import { ModalFooter } from 'flowbite-react/lib/esm/components/Modal/ModalFooter'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import Toast from '../../components/Toast'
import { useAddSectionMutation } from '../category/sectionApiSlice'

const SectionAdd = ({ show, onClose }) => {
  const {
    register,
    getValues,
    reset
  } = useForm()

  const [addNewSection, { isSuccess, isError }] = useAddSectionMutation()

  const onSaveSectionClicked = async (e) => {
    e.preventDefault()
    const nameSection = getValues('nameSection')
    await addNewSection({
      nameSection
    })

    onClose()
  }

  useEffect(() => {
    if (isSuccess) {
      reset()
      Toast.fire({
        icon: 'success',
        title: 'Se ha creado una nueva sección'
      })
    }

    if (isError) {
      Toast.fire({
        icon: 'error',
        title: '¡Fallo crear la sección!'
      })
    }
  }, [isSuccess, isError, reset])

  const content = (
    <>
      <Modal show={show} onClose={onClose} dismissible>
        <form onSubmit={onSaveSectionClicked}>
          <ModalHeader className='!bg-blues-200'>
            <div className='flex ml-14'>
              <div className='flex items-center flex-col mx-4 my-auto text-xl font-semibold text-white'>
                Nombre:
              </div>
              <div className='flex flex-col mx-4 my-auto'>
                <textarea
                  className='border-2 rounded-lg text-center text-md h-10 w-72 dark:!text-black resize-none'
                  placeholder='Nombre de la Nueva Sección'
                  id='nameSection'
                  {...register('nameSection')}
                  required
                  maxLength={255}
                />
              </div>
            </div>
          </ModalHeader>
          <ModalBody>
          </ModalBody>
          <ModalFooter className='justify-end'>
            <button
              className='bg-blues-200 text-white py-2 px-4 rounded-md'
              type='submit'
            >
              Crear
            </button>
            <a
              className='bg-gray-500 text-white py-2 px-4 rounded-md cursor-pointer'
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

export default SectionAdd
