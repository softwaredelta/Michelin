import Header from '../../components/Header'
import ModifiedFooter from '../../components/ModifiedFooter'
import NavBar from '../../components/NavBar'
import Section from './Section'
import { useGetSectionsQuery } from './categoryApiSlice'

const SectionList = () => {
  let sections

  const {
    data: sectionData,
    isLoading: isLoadingSections,
    isSuccess: isSuccessSections,
    isError: isErrorSections
  } = useGetSectionsQuery()

  if (isLoadingSections) sections = <div> Cargando... </div>
  if (isErrorSections) {
    sections = <div> Sin opciones válidas </div>
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
    <div>
      <NavBar />
      <div className='pt-20 w-full h-screen flex flex-col items-center dark:!bg-blues-400 overflow-y-scroll'>
        <Header myText='Cuestionarios' />
        <div className='container flex flex-wrap justify-items-stretch '>
          {sections}
        </div>
        <ModifiedFooter />
      </div>
    </div>
  )

  return content
}

export default SectionList
