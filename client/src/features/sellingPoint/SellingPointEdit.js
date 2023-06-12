import { Modal, Select } from 'flowbite-react'
import { ModalHeader } from 'flowbite-react/lib/esm/components/Modal/ModalHeader'
import { ModalBody } from 'flowbite-react/lib/esm/components/Modal/ModalBody'
import { ModalFooter } from 'flowbite-react/lib/esm/components/Modal/ModalFooter'
import { useEditSPMutation, selectSPById } from '../../services/sellingPointApiSlice'
import { useGetCategoriesQuery } from '../../services/sectionApiSlice'
import { useGetStateQuery } from '../../services/stateApiSlice'
import StateOption from './state/StateOption'
import CategoryOption from '../category/CategoryOption'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import Toast from '../../components/alerts/Toast'
import { useSelector } from 'react-redux'

/* https://docs.google.com/spreadsheets/d/1Eme0YIj9GZCc3QCBQehDUGZIgS7aTilZx4oUy35dcGc/edit?usp=sharing
 * Historia de Usuario M2_H3
 */

const SellingPointEdit = ({ show, onClose, spId }) => {
  const sp = useSelector(state => selectSPById(state, spId))

  const {
    register,
    getValues,
    reset
  } = useForm()

  const [editSP, { isSuccess, isError }] = useEditSPMutation()

  const {
    data: category,
    isSuccess: isSuccessCategory,
    isError: isErrorCategory
  } = useGetCategoriesQuery()

  const {
    data: state,
    isSuccess: isSuccessState,
    isError: isErrorState
  } = useGetStateQuery()

  let myCategory, myState

  /**
  * This function edits a selling point's information based on user input and closes the editing
  * modal.
  * @param e - The "e" parameter is an event object that represents the event that triggered the
  * function. In this case, it is likely a click event on a button or link.
  */
  const onEditSPClicked = async (e) => {
    e.preventDefault()
    const name = getValues('name')
    const zone = getValues('select_zone')
    const type = getValues('select_type')
    const address = getValues('address')
    const phone = getValues('phone')
    const spId = sp.id_sp

    await editSP({
      type,
      zone,
      address,
      name,
      phone,
      spId
    })
    onClose()
  }

  const onClosed = () => {
    onClose()
    reset()
  }

  if (isErrorCategory) {
    myCategory = <option disabled> Sin opciones válidas </option>
  }

  if (isSuccessCategory) {
    const { ids } = category

    const listContent = ids?.length
      ? ids.map((idCategory) => (
        <CategoryOption key={idCategory} categoryId={idCategory} />
      ))
      : null

    myCategory = listContent
  }

  if (isErrorState) {
    myState = <option disabled> Sin opciones válidas </option>
  }

  if (isSuccessState) {
    const { ids } = state

    const listContent = ids?.length
      ? ids.map((idState) => <StateOption key={idState} zoneId={idState} />)
      : null

    myState = listContent
  }

  useEffect(() => {
    if (isSuccess) {
      reset()
      Toast.fire({
        icon: 'success',
        title: 'El Punto de Venta se ha editado de forma exitosa'
      })
    }

    if (isError) {
      Toast.fire({
        icon: 'error',
        title: '¡Tienes campos faltantes o Inválidos!'
      })
    }
  }, [isSuccess, isError, reset])

  const content = (
    <>
      <Modal show={show} onClose={onClose} dismissible>
        <form onSubmit={onEditSPClicked}>
          <ModalHeader className='!bg-blues-200'>
            <div className='flex ml-14'>
              <div className='flex items-center flex-col mx-4 my-auto text-xl font-semibold text-white'>
                Nombre:
              </div>
              <div className='flex flex-col mx-4'>
                <textarea
                  className='border-2 rounded-lg text-center text-md my-auto h-4/5 w-72 dark:text-black resize-none'
                  id='name'
                  {...register('name')}
                  defaultValue={sp.name}
                  required
                  maxLength={50}
                  rows='2'
                />
              </div>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className='flex justify-center'>
              <div className='flex flex-col mx-4 items-end'>
                <div className='flex-row align-bottom text-center my-2 text-lg font-semibold dark:text-white'>
                  Zona:
                </div>
                <div className='flex-row text-center my-3 text-lg font-semibold dark:text-white'>
                  Tipo:
                </div>
                <div className='flex-row text-center my-5 text-lg font-semibold dark:text-white'>
                  Dirección:
                </div>
                <div className='flex-row text-center my-4 text-lg font-semibold dark:text-white'>
                  Teléfono:
                </div>
              </div>
              <div className='flex flex-col w-3/4'>
                <Select
                  className='rounded-md lg:mt-2 lg:mb-6 xl:mt-0 xl:mb-3 dark:border-2'
                  id='select_zone'
                  name='select_zone'
                  {...register('select_zone')}
                  required
                >
                  <option value={sp.id_state} selected>
                    {sp.zone}
                  </option>

                  {myState}
                </Select>
                <Select
                  className='lg:mb-3 xl:mb-3 rounded-md dark:border-2'
                  id='select_type'
                  name='select_type'
                  {...register('select_type')}
                  required
                >
                  <option value={sp.id_category}>{sp.category} </option>
                  {myCategory}
                </Select>
                <textarea
                  className='border-2 rounded-md my-2 iPadAir:mt-4 lg:mt-3 lg:mb-2 xl:mt-1 xl:mb-3 pl-2 resize-none dark:bg-transparent dark:text-white'
                  id='address'
                  {...register('address')}
                  defaultValue={sp.address}
                  required
                  maxLength={255}
                />

                <input
                  className='border-2 rounded-md my-2 pl-2 dark:bg-transparent dark:text-white'
                  id='phone'
                  {...register('phone')}
                  defaultValue={sp.phone}
                  pattern='[0-9]{10}'
                  required
                  maxLength={10}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter className='justify-end'>
            <button
              className='bg-blues-200 text-white py-2 px-4 rounded-md'
              type='submit'
            >
              Aceptar
            </button>
            <a
              className='bg-gray-500 text-white py-2 px-4 rounded-md cursor-pointer'
              onClick={onClosed}
              href={onClosed}
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

export default SellingPointEdit
