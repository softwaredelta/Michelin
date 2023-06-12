import { useEffect, useState } from 'react'
import ModifiedFooter from '../../components/headers/ModifiedFooter'
import NavBar from '../../components/headers/NavBar'
import { useGetSPQuery } from '../../services/sellingPointApiSlice'
import SPAcordion from '../../components/accordions/SPAcordion'
import { BsSearch } from 'react-icons/bs'
import CurrentForm from '../../services/CurrentForm'
import Swal from 'sweetalert2'

/*
 * Link a requerimientos funcionales:
 * https://docs.google.com/spreadsheets/d/1Eme0YIj9GZCc3QCBQehDUGZIgS7aTilZx4oUy35dcGc/edit?usp=sharing
 */

// Historia de usuario M13_H1
const FormStart = () => {
  const Form = CurrentForm.getInstance()
  Form.loadFormInfo()
  const name = localStorage.getItem("name"); // eslint-disable-line

  const { data: sp, isLoading, isSuccess, isError } = useGetSPQuery()

  const [listContent, setListContent] = useState([])

  let message

  /**
  * This function filters and displays a list of selling points based on user input in a search box.
  * @param e - The parameter `e` is an event object that is passed to the `onSearchBoxChanged`
  * function. It represents the event that occurred when the search box was changed, such as a key
  * press or input change.
  */
  const onSearchBoxChanged = (e) => {
    const { ids, entities } = sp

    if (ids.length === 0) {
      message = (
        <p className='text-3xl font-semibold dark:!text-white'>
          No hay puntos de venta que mostrar
        </p>
      )
    }

    let currentListContent = ids?.length
      ? ids.map((idSP) => {
        if (
          entities[idSP].name
            .toLowerCase()
            .startsWith(e.target.value.toLowerCase())
        ) {
          return <SPAcordion key={idSP} spId={idSP} />
        }
        return null
      })
      : null

    if (currentListContent === undefined) {
      currentListContent = []
    }
    setListContent(currentListContent)
  }

  if (isLoading) {
    message = (
      <p className='text-3xl font-semibold dark:!text-white'>Cargando...</p>
    )
  }

  if (isError) {
    message = (
      <p className='text-3xl font-semibold dark:!text-white'>
        No hay conexión con la base de datos
      </p>
    )
  }

  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        title: 'Uso de iPad',
        html: 'Esta sección esta dirigida al uso específico en iPad. <br /> Te sugerimos sólo ingresar a ella desde estos dispositivos, de lo contrario podrían existir algunos defectos visuales.',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
      })

      const { ids } = sp

      const contentInfo = ids?.length
        ? ids.map((idSP) => <SPAcordion key={idSP} spId={idSP} />)
        : null

      setListContent(contentInfo)
    }
  }, [isSuccess, sp])

  const content = (
    <>
      <div>
        <NavBar />
        <div className='pt-20 w-full min-h-screen dark:!bg-blues-400'>
          <div className='flex flex-col'>
            <div className='mr-24'>
              <div className='grid grid-cols-4 mb-2'>
                <h2 className='text-3xl font-michelin col-span-2 text-blues-200 dark:text-white mt-2 ml-10'>
                  Bienvenido/a {name}
                </h2>
                <BsSearch className='mr-2 my-1 mt-5 dark:fill-white col-span-1 justify-self-end' />
                <input
                  className=' col-span-1 border-2 rounded-sm mb-4 mt-4 text-mdh-4/5 w-72 dark:!text-black'
                  placeholder=' Buscar...'
                  onChange={onSearchBoxChanged}
                  maxLength={255}
                />
              </div>
              <p className='text-3xl font-semibold text-gray-500 dark:!text-white ml-10 mb-4'>Selecciona un punto de venta:</p>
            </div>
            {message}
            <div className='w-full'>{listContent}</div>
            <ModifiedFooter />
          </div>
        </div>
      </div>
    </>
  )
  return content
}

export default FormStart
