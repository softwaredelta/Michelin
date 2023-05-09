import { useState } from 'react'
import ModifiedFooter from '../../components/ModifiedFooter'
import SellingPointAdd from './SellingPointAdd'
import NavBar from '../../components/NavBar'
import SellingPoint from './SellingPoint'
import { useGetSPQuery } from './sellingPointApiSlice'
import Header from '../../components/Header'
import Bluebutton from '../../components/Bluebutton'

const SellingPointList = () => {
  const [show, setShow] = useState(false)

  const handleSetShow = () => {
    setShow(true)
  }

  const handleClose = () => {
    setShow(false)
  }

  const { data: sp, isLoading, isSuccess, isError } = useGetSPQuery()

  let message
  let listContent
  if (isLoading) message = <p className='text-3xl font-semibold dark:!text-white'>Cargando...</p>
  if (isError) {
    message = <p className='text-3xl font-semibold dark:!text-white'>No hay conexión con la base de datos</p>
  }

  if (isSuccess) {
    const { ids } = sp
    if (ids.length === 0) {
      message = <p className='text-3xl font-semibold dark:!text-white'>No hay puntos de venta que mostrar</p>
    }
    listContent = ids?.length
      ? ids.map((idSP) => <SellingPoint key={idSP} spId={idSP} />)
      : null
  }
  const content = (
    <>
      <div>
        <NavBar />
        <div className='pt-20 p- w-full h-screen flex flex-col items-center dark:!bg-blues-400'>
          <Header myText='Punto de Venta' />
          <div className='self-end mr-5'>
            <Bluebutton
              myText='+ Nuevo Punto de Venta'
              method={handleSetShow}
            />
          </div>
          {message}
          <div className='container flex flex-wrap justify-items-stretch dark:!bg-blues-400'>
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
