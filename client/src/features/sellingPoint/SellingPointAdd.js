import { Modal } from 'flowbite-react'
import { ModalHeader } from 'flowbite-react/lib/esm/components/Modal/ModalHeader'
import { ModalBody } from 'flowbite-react/lib/esm/components/Modal/ModalBody'
import { ModalFooter } from 'flowbite-react/lib/esm/components/Modal/ModalFooter'
import { useGetCategoriesQuery } from '../category/categoryApiSlice'
import { useGetStateQuery } from './state/stateApiSlice'
import StateOption from './state/StateOption'
import CategoryOption from '../category/CategoryOption'

const SellingPointAdd = ({ show, onClose }) => {
  let mycategory, mystate

  const {
    data: category,
    isLoading: isLoadingCategory,
    isSuccess: isSuccessCategory,
    isError: isErrorCategory,
    error: errorCategory
  } = useGetCategoriesQuery()
  const {
    data: state,
    isLoading: isLoadingState,
    isSuccess: isSuccessState,
    isError: isErrorState,
    error: errorState
  } = useGetStateQuery()

  if (isLoadingCategory) mycategory = <option> Cargando </option>
  if (isErrorCategory) {
    mycategory = <option> Sin opciones válidas </option>
  }

  if (isSuccessCategory) {
    const { ids } = category
    const listContent = ids?.length
      ? ids.map((idCategory) => (
        <CategoryOption key={idCategory} categoryId={idCategory} />
      ))
      : null
    mycategory = listContent
  }

  if (isLoadingState) mystate = <option> Cargando </option>
  if (isErrorState) {
    mystate = <option> Sin opciones válidas </option>
  }

  if (isSuccessState) {
    const { ids } = state
    const listContent = ids?.length
      ? ids.map((idState) => <StateOption key={idState} zoneId={idState} />)
      : null
    mystate = listContent
    console.log(listContent)
  }

  return (
    <>
      <Modal show={show} onClose={onClose} dismissible>
        <ModalHeader className='!bg-blues-200'>
          <div className='flex ml-14'>
            <div className='flex items-center flex-col mx-4 text-xl font-semibold text-white'>
              Nombre:
            </div>
            <div className='flex flex-col mx-4'>
              <input
                className='border-2 rounded-lg text-center min-h-full text-mdh-4/5 w-72'
                placeholder='Punto de Venta'
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
              <div className='flex-row text-center my-2 text-lg font-semibold'>
                Tipo:
              </div>
              <div className='flex-row text-center my-5 text-lg font-semibold'>
                Dirección:
              </div>
              <div className='flex-row text-center my-2 text-lg font-semibold'>
                Teléfono:
              </div>
            </div>
            <div className='flex flex-col w-3/4'>
              <select className='border-2 rounded-md my-2'>{mystate}</select>
              <select className='border-2 rounded-md my-2'>{mycategory}</select>
              <textarea className='border-2 rounded-md my-2 resize-none' />
              <input className='border-2 rounded-md my-2' />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            className='bg-blues-200 text-white py-2 px-4 rounded-md'
            onClick={onClose}
          >
            Aceptar
          </button>
          <button
            className='bg-gray-500 text-white py-2 px-4 rounded-md'
            onClick={onClose}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default SellingPointAdd
