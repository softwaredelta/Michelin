import Report from '../features/history/Report'
import Header from './Header'
import ModifiedFooter from './ModifiedFooter'
import NavBar from './NavBar'
import { useGetFormsByUserQuery, useGetFormCountByUserQuery } from '../features/form/formApiSlice'

const Public = () => {
  const { data: forms, isLoading, isSuccess, isError } = useGetFormsByUserQuery({ mail: localStorage.getItem('mail') }) // eslint-disable-line
  const {
    data: count,
    isSuccess: isSuccesCount
  } = useGetFormCountByUserQuery({ mail: localStorage.getItem('mail') }) // eslint-disable-line

  const baseReportRoute = 'http://localhost:3080/form/report/'

  let tableContent
  let message
  let countContent = 0

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

    if (isSuccesCount) {
      countContent = count
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
        <div className='pt-20 w-full h-screen flex flex-col items-center'>
          <div className='container flex flex-wrap justify-items-stretch' />
          <div className='self-start ml-7 my-2 mb-5'>
            <h2 className='text-3xl font-miche font-extrabold underline text-blues-200'>
              ¡Bienvenido example!
            </h2>
          </div>
          <div className='w-full h-56 flex justify-center rounded'>
            <img
              className='object-none object-left w-5/12 h-auto rounded-lg'
              src='/images/vehiculo_login.jpg'
              alt='imagen de vehículo'
            />
            <div className='bg-blues-300 w-3/12 rounded-lg'>
              <div className='text-center text-white font-semibold pt-10 text-xl'>
                Número de recorridos realizados
              </div>
              <div class='flex items-center justify-center m-auto'>
                <svg class='w-52 h-52' fill='none' fill-opacity='0.0'>
                  <circle
                    class='text-white'
                    stroke-width='5'
                    stroke='currentColor'
                    r='50'
                    cx='100'
                    cy='75'
                  />
                  <text
                    class='text-3xl text-white'
                    x='48%'
                    y='37%'
                    text-anchor='middle'
                    fillOpacity={1.0}
                    fill='currentColor'
                    stroke-width='6px'
                    dy='.3em'
                  >
                    {countContent}
                  </text>
                </svg>
              </div>
            </div>
          </div>
          <div className='self-start w-full mt-8'>
            <Header myText='Historial' />
            <div className='content-start w-9/12 ml-4 mb-6 py-4 border-b-2 dark:border-blues-200'>
              <div className='flex flex-row w-9/12 justify-between'>
                <h2 className='font-semibold text-center ml-28 dark:!text-white'>
                  Nombre
                </h2>
                <h2 className='font-semibold text-center  dark:!text-white'>
                  Estado
                </h2>
                <h2 className='font-semibold text-center mr-40 dark:!text-white'>
                  Fecha
                </h2>
              </div>
            </div>
            <div className='h-96 w-10/12 self-center overflow-y-scroll m-auto'>
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
export default Public
