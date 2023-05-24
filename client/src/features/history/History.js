import ModifiedFooter from '../../components/ModifiedFooter'
import NavBar from '../../components/NavBar'
import Header from '../../components/Header'
import Report from '../history/Report'
import { useGetFormsByUserQuery } from '../form/formApiSlice'

const History = () => {
  const { data: forms, isLoading, isSuccess, isError } = useGetFormsByUserQuery({ mail: localStorage.getItem('mail') }) // eslint-disable-line

  const baseReportRoute = 'http://localhost:3080/form/report/'

  let tableContent
  let message

  if (isLoading) message = <p>Loading...</p>

  if (isError) {
    message = (
      <p className='text-3xl font-semibold dark:!text-white'>
        No hay conexion con la base de datos
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
      ? ids.map((idForm) =>
        <Report
          key={idForm}
          spName={entities[idForm].sp_name}
          spZone={entities[idForm].zone}
          repDate={`${(entities[idForm].date).substring(8, 10)}/${(entities[idForm].date).substring(5, 7)}/${(entities[idForm].date).substring(0, 4)}`}
          userName={`${entities[idForm].user_name} ${entities[idForm].user_last_name}`}
          repTime={`${(entities[idForm].duration).substring(3, 5)} minutos`}
          repLink={baseReportRoute + entities[idForm].file_link}
          intPercentage={entities[idForm].interior_grade}
          extPercentage={entities[idForm].exterior_grade}
          clientPercentage={entities[idForm].client_grade}
          managerPercentage={entities[idForm].store_manager_grade}
        />
      )
      : null
  }

  const content = (
    <>
      <div>
        <NavBar />
        <div className='pt-20 w-full h-screen flex flex-col items-center dark:!bg-blues-400'>
          <Header myText='Historial' />
          <div className='container pt-5 w-full h-screen overflow-y-scroll flex flex-col items-center dark:!bg-blues-400'>
            <div className='content-center grid grid-cols-3 w-7/12 ml-4 mb-6 py-4 border-b-2 dark:border-blues-200'>
              <h2 className='font-semibold text-center mr-14 dark:!text-white'>
                Nombre
              </h2>
              <h2 className='font-semibold text-center mr-6 dark:!text-white'>
                Estado
              </h2>
              <h2 className='font-semibold text-center dark:!text-white'>
                Fecha
              </h2>
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
