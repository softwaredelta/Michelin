import ModifiedFooter from '../../components/ModifiedFooter'
import NavBar from '../../components/NavBar'
import Header from '../../components/Header'
import Report from '../history/Report'
import { useGetFormsByUserQuery } from '../form/formApiSlice'

const History = () => {
  const {
    data: forms,
    isLoading,
    isSuccess,
    isError
  } = useGetFormsByUserQuery({ mail: localStorage.getItem("mail") }); // eslint-disable-line

  const baseReportRoute = 'http://localhost:3080/form/report/'

  let tableContent
  let message

  if (isLoading) message = <p>Loading...</p>

  if (isError) {
    message = (
      <p className='text-3xl font-semibold dark:!text-white'>
        No hay conexión con la base de datos
      </p>
    )
  }

  if (isSuccess) {
    const { ids, entities } = forms
    if (ids.length === 0) {
      message = (
        <p className='text-3xl font-semibold dark:!text-white'>
          No hay recorridos registrados
        </p>
      )
    }

    tableContent = ids?.length
      ? ids.map((idForm) => (
        <Report
          key={idForm}
          spName={entities[idForm].sp_name}
          spZone={entities[idForm].zone}
          repDate={`${entities[idForm].date.substring(8, 10)}/${entities[
              idForm
            ].date.substring(5, 7)}/${entities[idForm].date.substring(0, 4)}`}
          userName={`${entities[idForm].user_name} ${entities[idForm].user_last_name}`}
          repTime={`${entities[idForm].duration.substring(3, 5)} minutos`}
          repLink={baseReportRoute + entities[idForm].file_link}
          intPercentage={entities[idForm].interior_grade}
          extPercentage={entities[idForm].exterior_grade}
          clientPercentage={entities[idForm].client_grade}
          managerPercentage={entities[idForm].store_manager_grade}
        />
      ))
      : null
  }

  const content = (
    <>
      <div>
        <NavBar />
        <div className='pt-20 w-full h-screen flex flex-col items-center bg-gradient-to-b from-white to-gray-100 dark:!bg-gradient-to-b dark:!from-blues-500 dark:!to-blues-500'>
          <Header myText='Historial de Auditorías' />
          <div className='container pt-5 h-screen overflow-y-hidden w-10/12 items-center dark:!bg-blues-500'>
            <div className='content-start w-full ml-0 mb-6 py-4 border-b-2 dark:border-blues-200'>
              <div className='flex flex-row xl:w-9/12 lg:w-10/12 md:w-10/12 justify-between'>
                <h2 className='font-semibold 2xl:ml-28 xl:ml-32 iPadAir:ml-22 lg:ml-24 small:text-sm md:text-base dark:!text-white'>
                  Nombre
                </h2>
                <h2 className='font-semibold 2xl:mr-0 xl:mr-5 iPadAir:mr-1 lg:ml-3 md:mr-1 md:text-base md:m-0 small:text-sm small:mr-3 dark:!text-white'>
                  Estado
                </h2>
                <h2 className='font-semibold 2xl:mr-32 xl:mr-12 iPadAir:mr-52 lg:mr-24 md:text-base md:-mr-12 small:text-sm small:-mr-1 dark:!text-white'>
                  Fecha
                </h2>
              </div>
            </div>
            <div className='h-4/5 overflow-y-scroll'>
              {tableContent}
              {message}
            </div>
          </div>
          <ModifiedFooter />
        </div>
      </div>
    </>
  )
  return content
}

export default History
