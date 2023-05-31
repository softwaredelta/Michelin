import Header from '../../components/Header'
import ModifiedFooter from '../../components/ModifiedFooter'
import NavBar from '../../components/NavBar'
import Section from './Section'
import { useGetSectionsQuery } from './sectionApiSlice'
import SectionAdd from './SectionAdd'
import { useState } from 'react'
import Bluebutton from '../../components/Bluebutton'

const SectionList = () => {
  const [show, setShow] = useState(false)

  const {
    data: sectionData,
    isLoading: isLoadingSections,
    isSuccess: isSuccessSections,
    isError: isErrorSections
  } = useGetSectionsQuery()

  let sections
  
  const handleSetShow = () => {
    setShow(true)
  }

  const handleClose = () => {
    setShow(false)
  }
  if (isLoadingSections) sections = <div> Cargando... </div>

  if (isErrorSections) {
    sections = <div className='font-semibold text-3xl m-auto dark:text-white'> Sin opciones válidas </div>
  }

  if (isSuccessSections) {
    const { ids, entities } = sectionData

    const listContent = ids?.length
      ? ids.map((idSection) => (
        <Section key={idSection} sectionTitle={entities[idSection].section_name} idSection={idSection} />
      ))
      : null

    sections = listContent
  }

  const content = (
    <>
    <div>
      <NavBar />
      <div className='pt-20 w-full h-screen flex flex-col items-center bg-gradient-to-b from-white to-gray-100 dark:!bg-gradient-to-b dark:!from-blues-500 dark:!to-blues-500'>
        <Header myText='Cuestionarios' />
        <div className='self-end mr-5'>
            <Bluebutton
              myText='+ Nueva Sección'
              method={handleSetShow}
            />
          </div>
        <div className='container flex flex-col justify-items-stretch overflow-y-scroll'>
          {sections}
        </div>
        <ModifiedFooter />
      </div>
    </div>
    <SectionAdd show={show} onClose={handleClose} />
    </>
  )
  return content
}

export default SectionList
