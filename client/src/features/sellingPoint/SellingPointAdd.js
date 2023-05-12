import { Modal, Select, Tooltip } from 'flowbite-react'
import { ModalHeader } from 'flowbite-react/lib/esm/components/Modal/ModalHeader'
import { ModalBody } from 'flowbite-react/lib/esm/components/Modal/ModalBody'
import { ModalFooter } from 'flowbite-react/lib/esm/components/Modal/ModalFooter'
import { useAddNewSPMutation } from './sellingPointApiSlice'
import { useGetCategoriesQuery } from '../category/sectionApiSlice'
import { useGetStateQuery } from './state/stateApiSlice'
import StateOption from './state/StateOption'
import CategoryOption from '../category/CategoryOption'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import Toast from '../../components/Toast'

const SellingPointAdd = ({ show, onClose }) => {
  const {
    register,
    getValues,
    reset
  } = useForm()

  const [addNewSP, { isSuccess, isError }] = useAddNewSPMutation()

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

  const onSaveSPClicked = async (e) => {
    e.preventDefault()
    const name = getValues('name')
    const zone = getValues('select_zone')
    const type = getValues('select_type')
    const address = getValues('address')
    const phone = getValues('phone')

    await addNewSP({
      type,
      zone,
      address,
      rating: 0,
      name,
      phone
    })

    onClose()
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
        title: 'Se ha creado un nuevo punto de venta'
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
        <form onSubmit={onSaveSPClicked}>
          <ModalHeader className='!bg-blues-200'>
            <div className='flex ml-14'>
              <div className='flex items-center flex-col mx-4 text-xl font-semibold text-white'>
                Nombre:
              </div>
              <div className='flex flex-col mx-4'>
                <input
                  className='border-2 rounded-lg text-center text-mdh-4/5 w-72 dark:!text-black'
                  placeholder='Punto de Venta'
                  id='name'
                  {...register('name')}
                  required
                  maxLength={255}
                />
              </div>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className='flex justify-center'>
              <div className='flex flex-col mx-4 items-end'>
                <div className='flex flex-row align-bottom text-center my-2 text-lg font-semibold dark:text-white'>
                  <Tooltip
                    content='El estado donde se encuentra el punto de venta'
                    trigger='hover'
                    className='dark:!bg-white dark:!text-black'
                  >
                    Zona:
                  </Tooltip>
                </div>
                <div className=' flex flex-row text-center my-3 text-lg font-semibold dark:text-white'>
                  <Tooltip
                    content='Si el punto de venta es Normal o Premium'
                    trigger='hover'
                    className='dark:!bg-white dark:!text-black'
                  >
                    Tipo:
                  </Tooltip>
                </div>
                <div className='flex flex-row text-center my-5 text-lg font-semibold dark:text-white'>
                  <Tooltip
                    content='Un máximo de 255 caracteres'
                    trigger='hover'
                    className='dark:!bg-white dark:!text-black'
                  >
                    Dirección:
                  </Tooltip>
                </div>
                <div className='flex flex-row text-center my-4 text-lg font-semibold dark:text-white'>
                  <Tooltip
                    content='Un máximo de 10 números, sin guiones y no código de país'
                    trigger='hover'
                    className='dark:!bg-white dark:!text-black'
                  >
                    Teléfono:
                  </Tooltip>
                </div>
              </div>
              <div className='flex flex-col w-3/4'>
                <Select
                  className='mb-3 border-2 rounded-md'
                  id='select_zone'
                  name='select_zone'
                  {...register('select_zone')}
                  required
                >
                  <option value='' selected>
                    Selecciona un estado
                  </option>

                  {myState}
                </Select>
                <Select
                  className='mb-3 border-2 rounded-md'
                  id='select_type'
                  name='select_type'
                  {...register('select_type')}
                  required
                >
                  <option value='' name='option-disabled' selected>
                    Selecciona un tipo
                  </option>
                  {myCategory}
                </Select>
                <textarea
                  className='border-2 rounded-md my-2 resize-none dark:bg-transparent dark:text-white'
                  id='address'
                  {...register('address')}
                  required
                  maxLength={255}
                />
                <input
                  className='border-2 rounded-md my-2 dark:bg-transparent dark:text-white'
                  id='phone'
                  {...register('phone')}
                  required
                  pattern='[0-9]{10}'
                  maxLength={10}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
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

export default SellingPointAdd
