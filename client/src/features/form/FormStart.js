import { useEffect, useState } from 'react'
import ModifiedFooter from '../../components/ModifiedFooter'
import NavBar from '../../components/NavBar'
import { useGetSPQuery } from '../sellingPoint/sellingPointApiSlice'
import Header from '../../components/Header'
import SPAcordion from '../../components/SPAcordion'
import { BsSearch } from 'react-icons/bs'
import CurrentForm from '../../services/CurrentForm'

const FormStart = () => {
  const Form = CurrentForm.getInstance()
  Form.loadFormInfo()

  const { data: sp, isLoading, isSuccess, isError } = useGetSPQuery()

  let message
  const [listContent, setListContent] = useState([])

  const onSearchBoxChanged = e => {
    const { ids, entities } = sp

    if (ids.length === 0) {
      message = <p className='text-3xl font-semibold dark:!text-white'>No hay puntos de venta que mostrar</p>
    }

    let currentListContent = ids?.length
      ? ids.map((idSP) => {
        if ((entities[idSP].name).toLowerCase().startsWith(e.target.value.toLowerCase())) {
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

  if (isLoading) message = <p className='text-3xl font-semibold dark:!text-white'>Cargando...</p>

  if (isError) {
    message = <p className='text-3xl font-semibold dark:!text-white'>No hay conexión con la base de datos</p>
  }

  useEffect(() => {
    if (isSuccess) {
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
        <div className='pt-20 w-full min-h-screen flex flex-col items-center dark:!bg-blues-400'>
          <Header myText='Iniciar una auditoría' />
          <div className='self-end mr-24 items-center'>
            <div className='grid grid-cols-2 grid-rows-1'>
              <BsSearch className='mr-2 justify-self-end my-1 dark:fill-white' />
              <input
                className='border-2 rounded-sm mb-4 text-mdh-4/5 w-72 dark:!text-black'
                placeholder=' Buscar...'
                onChange={onSearchBoxChanged}
                maxLength={255}
              />
            </div>
          </div>
          {message}
          <div className='w-full'>
            {listContent}
          </div>
          <ModifiedFooter />
        </div>
      </div>
    </>
  )
  return content
}

export default FormStart
