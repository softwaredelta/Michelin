import { Modal, Select } from 'flowbite-react'
import { ModalHeader } from 'flowbite-react/lib/esm/components/Modal/ModalHeader'
import { ModalBody } from 'flowbite-react/lib/esm/components/Modal/ModalBody'
import { ModalFooter } from 'flowbite-react/lib/esm/components/Modal/ModalFooter'
import { useEditSPMutation, selectSPById } from './sellingPointApiSlice'
import { useGetCategoriesQuery } from '../category/categoryApiSlice'
import { useGetStateQuery } from './state/stateApiSlice'
import StateOption from './state/StateOption'
import CategoryOption from '../category/CategoryOption'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import Toast from '../../components/Toast'
import { useSelector } from 'react-redux'

const SellingPointEdit = ({ show, onClose, spId }) => {
  const sp = useSelector(state => selectSPById(state, spId))

  const {
    register,
    handleSubmit,
    getValues,
    reset
  } = useForm()

  const [editSP, { isSuccess }] = useEditSPMutation()

  let myCategory, myState

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

  const onEditSPClicked = async (e) => {
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

  useEffect(() => {
    if (isSuccess) {
      // reset()
      Toast.fire({
        icon: 'success',
        title: 'El Punto de Venta se ha editado de forma exitosa'
      })
    }
  }, [isSuccess, reset])

  const onError = () => {
    Toast.fire({
      icon: 'error',
      title: '¡Tienes campos faltantes o Inválidos!'
    })
  }

  return (
    <>
      <Modal show={show} onClose={onClose} dismissible>
        <form onSubmit={handleSubmit(onEditSPClicked, onError)}>
          <ModalHeader className='!bg-blues-200'>
            <div className='flex ml-14'>
              <div className='flex items-center flex-col mx-4 text-xl font-semibold text-white'>
                Nombre:
              </div>
              <div className='flex flex-col mx-4'>
                <input
                  className='border-2 rounded-lg text-center text-mdh-4/5 w-72'
                  id='name'
                  {...register('name', {
                    required: true,
                    pattern: {
                      value: /^\S+[a-zA-Z\s]*/,
                      message: 'error message'
                    }
                  })}
                  defaultValue={sp.name}
                />

              </div>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className='flex justify-center'>
              <div className='flex flex-col mx-4 items-end'>
                <div className='flex-row align-bottom text-center my-2 text-lg font-semibold'>
                  Zona:
                </div>
                <div className='flex-row text-center my-3 text-lg font-semibold'>
                  Tipo:
                </div>
                <div className='flex-row text-center my-5 text-lg font-semibold'>
                  Dirección:
                </div>
                <div className='flex-row text-center my-4 text-lg font-semibold'>
                  Teléfono:
                </div>
              </div>
              <div className='flex flex-col w-3/4'>
                <Select
                  className='mb-3'
                  id='select_zone'
                  name='select_zone'
                  {...register('select_zone', {
                    required: true
                  })}
                >
                  <option value={sp.id_state} selected>
                    {sp.zone}
                  </option>

                  {myState}
                </Select>
                <Select
                  className='mb-3'
                  id='select_type'
                  name='select_type'
                  {...register('select_type', {
                    required: true
                  })}
                >
                  <option value={sp.id_category}>{sp.category} </option>
                  {myCategory}
                </Select>
                <textarea
                  className='border-2 rounded-md my-2 resize-none'
                  id='address'
                  {...register('address', {
                    required: true,
                    pattern: {
                      value: /^\S+[a-zA-Z\s]*/,
                      message: 'error message'
                    }
                  })}
                  defaultValue={sp.address}
                />
                <input
                  className='border-2 rounded-md my-2'
                  id='phone'
                  {...register('phone', {
                    required: true,
                    pattern: {
                      value: /[0-9]{10}/,
                      message: 'error message'
                    }
                  })}
                  defaultValue={sp.phone}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              className='bg-blues-200 text-white py-2 px-4 rounded-md'
              type='submit'
            >
              Aceptar
            </button>
            <button
              className='bg-gray-500 text-white py-2 px-4 rounded-md end'
              onClick={onClose}
            >
              Cancelar
            </button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  )
}

export default SellingPointEdit
