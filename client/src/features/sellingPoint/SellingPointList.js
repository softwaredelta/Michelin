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

  const { data: sp, isLoading, isSuccess, isError, error } = useGetSPQuery()

  let content
  let message
  if (isLoading) content = <p>Cargando...</p>
  if (isError) {
    content = <p>{error?.data?.message}</p>
  }

  if (isSuccess) {
    const { ids } = sp
    console.log(sp)
    if (ids.length === 0){
      message =  <p className='text-2xl font-bold'>No hay puntos de venta que mostrar</p>
    }
    const listContent = ids?.length
      ? ids.map((idSP) => <SellingPoint key={idSP} spId={idSP} />)
      : null

    content = (
      <>
        <div>
          <NavBar />
          <div className='pt-20 w-full h-screen flex flex-col items-center'>
            <Header myText='Punto de Venta' />
            <div className='self-end mr-5'>
              <Bluebutton
                myText='+ Nuevo Punto de Venta'
                method={handleSetShow}
              />
            </div>
            {message}
            <div className='container  flex flex-wrap justify-items-stretch'>
              {listContent}
            </div>
            <ModifiedFooter />
          </div>
        </div>
        <SellingPointAdd show={show} onClose={handleClose} />
      </>
    )
  }
  return content
}

export default SellingPointList
