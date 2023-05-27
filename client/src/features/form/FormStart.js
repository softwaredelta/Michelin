import { useEffect, useState } from 'react'
import ModifiedFooter from '../../components/ModifiedFooter'
import NavBar from '../../components/NavBar'
import SellingPointOption from '../sellingPoint/SellingPointOption'
import { useGetSPQuery } from '../sellingPoint/sellingPointApiSlice'
import Header from '../../components/Header'
import { TextInput } from 'flowbite-react'
import SPAcordion from '../../components/SPAcordion'

const FormStart = () => {
  const [show, setShow] = useState(false)

  const { data: sp, isLoading, isSuccess, isError } = useGetSPQuery()

  let message
  let [listContent, setListContent] = useState([])
  let contentInfo

  const onSearchBoxChanged = e => {
    const { ids, entities } = sp

    if (ids.length === 0) {
      message = <p className='text-3xl font-semibold dark:!text-white'>No hay puntos de venta que mostrar</p>
    }

    let currentListContent = ids?.length
      ? ids.map((idSP) => {
            if((entities[idSP].name).toLowerCase().startsWith(e.target.value.toLowerCase())){
             return <SPAcordion key={idSP} spId={idSP} />
            }
        })
      : null
    
    if(currentListContent === undefined){
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
    
        if (ids.length === 0) {
          message = <p className='text-3xl font-semibold dark:!text-white'>No hay puntos de venta que mostrar</p>
        }
    
        contentInfo = ids?.length
          ? ids.map((idSP) => <SPAcordion key={idSP} spId={idSP} />)
          : null
    
          setListContent(contentInfo)
       
      }
  }, [isSuccess])

  const content = (
    <>
      <div>
        <NavBar />
        <div className='pt-20 w-full h-screen flex flex-col items-center dark:!bg-blues-400'>
          <Header myText='Punto de Venta' />
          <div className='self-end mr-24'>
          <input
                  className='border-2 rounded-sm mb-4 text-mdh-4/5 w-72 dark:!text-black'
                  placeholder='Buscar...'
                  onChange={onSearchBoxChanged}
                  maxLength={255}
                />
          </div>
          {message}
          <div className='w-full justify-center place-content-center items-center justify-items-center center'>
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