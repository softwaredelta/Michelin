import Header from '../../components/Header'
import ModifiedFooter from '../../components/ModifiedFooter'
import NavBar from '../../components/NavBar'
import Section from './Section'
import { useGetSectionsQuery } from './sectionApiSlice'

const SectionList = () => {
  const {
    data: sectionData,
    isLoading: isLoadingSections,
    isSuccess: isSuccessSections,
    isError: isErrorSections
  } = useGetSectionsQuery()

  let sections

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
    <div>
      <NavBar />
      <div className='pt-20 w-full h-screen flex flex-col items-center dark:!bg-blues-400'>
        <Header myText='Cuestionarios' />
        <div className='container flex flex-wrap justify-items-stretch overflow-y-scroll'>
          {sections}
        </div>
        <ModifiedFooter />
      </div>
    </div>
  )
  return content
}

export default SectionList
