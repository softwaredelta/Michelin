import { useState } from 'react'
import ModifiedFooter from '../../components/headers/ModifiedFooter'
import SellingPointAdd from './SellingPointAdd'
import NavBar from '../../components/headers/NavBar'
import SellingPoint from './SellingPoint'
import { useGetSPQuery } from './sellingPointApiSlice'
import Header from '../../components/headers/Header'
import Bluebutton from '../../components/buttons/Bluebutton'

/* https://docs.google.com/spreadsheets/d/1Eme0YIj9GZCc3QCBQehDUGZIgS7aTilZx4oUy35dcGc/edit?usp=sharing
 * Historia de Usuario M2_H4
 */

const SellingPointList = () => {
  const [show, setShow] = useState(false)

  const { data: sp, isLoading, isSuccess, isError } = useGetSPQuery()

  let message
  let listContent

  const handleSetShow = () => {
    setShow(true)
  }

  const handleClose = () => {
    setShow(false)
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

  if (isSuccess) {
    const { ids } = sp

    if (ids.length === 0) {
      message = (
        <p className='text-3xl font-semibold dark:!text-white'>
          No hay puntos de venta que mostrar
        </p>
      )
    }

    listContent = ids?.length
      ? ids.map((idSP) => <SellingPoint key={idSP} spId={idSP} />)
      : null
  }

  const content = (
    <>
      <div>
        <NavBar />
        <div className='pt-20 w-full min-h-screen flex flex-col items-center bg-gradient-to-b from-white to-gray-100 dark:!bg-gradient-to-b dark:!from-blues-500 dark:!to-blues-500'>
          <Header myText='Punto de Venta' />
          <div className='self-end mr-5'>
            <Bluebutton
              myText='+ Nuevo Punto de Venta'
              method={handleSetShow}
            />
          </div>
          {message}
          <div className='container flex flex-wrap justify-items-stretch'>
            {listContent}
          </div>
          <ModifiedFooter />
        </div>
      </div>
      <SellingPointAdd show={show} onClose={handleClose} />
    </>
  )
  return content
}

export default SellingPointList
