// import Report from '../features/history/Report'
import Report from '../history/Report'
import Header from '../../components/headers/Header'
import ModifiedFooter from '../../components/headers/ModifiedFooter'
import NavBar from '../../components/headers/NavBar'
import NumberCircle from '../../components/inputs/NumberCircle'
import { Button } from 'flowbite-react'
import {
  useGetFormsByUserQuery,
  useGetFormCountByUserQuery
} from '../../services/formApiSlice'
import { FaFlagCheckered } from 'react-icons/fa'

const Public = () => {
  const name = localStorage.getItem('name'); // eslint-disable-line

  const baseReportRoute = 'https://back2basics.software/api/form/report/'

  const {
    data: forms,
    isLoading,
    isSuccess,
    isError
  } = useGetFormsByUserQuery({ mail: localStorage.getItem("mail") }); // eslint-disable-line

  const { data: count, isSuccess: isSuccesCount } = useGetFormCountByUserQuery({
    mail: localStorage.getItem('mail') // eslint-disable-line
  }); // eslint-disable-line

  let tableContent
  let message
  let countContent = 0

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

    if (isSuccesCount) {
      countContent = count
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
          repTime={`${entities[idForm].duration} minutos`}
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
        <div className='w-full min-h-screen flex flex-col items-center bg-gradient-to-b from-white to-gray-100 dark:!bg-gradient-to-b dark:from-blues-500 dark:to-blues-500'>
          <div className='container flex flex-wrap justify-items-stretch' />1
          <div className='relative w-full h-96 !bg-zinc-800 mt-6'>
            <img
              className='object-cover object-left w-full h-96 overflow-hidden opacity-50'
              src='/images/vehiculo_login.jpg'
              alt='imagen de vehículo'
            />

            <div className='absolute self-start text-2xl text-blue-300 bottom-48 left-10 z-20'>
              <h2 className='text-3xl font-michelin underline text-white mt-2 shadow-xl'>
                ¡¡Bienvenido {name}!!
              </h2>
              <div className='justify-self-end w-7/12'>
                <Button
                  href='/form'
                  className='mt-4 px-5 !text-3xl shadow-xl !bg-trademark-50 !text-blues-200 !font-extrabold !rounded-full hover:!bg-yellow-500 dark:!bg-blues-300 dark:!text-trademark-50 dark:hover:!bg-blue-950 dark:hover:!text-yellow-500'
                >
                  <FaFlagCheckered size='20' className='mr-4' />
                  Iniciar Recorrido
                </Button>
              </div>
            </div>
            <NumberCircle countContent={countContent} />
          </div>
          <div className='self-start w-full mt-8'>
            <Header myText='Historial de Recorridos' />
            <div className='self-center m-auto w-9/12 mb-6 py-4 border-b-2 dark:border-blues-200'>
              <div className='flex flex-row xl:w-9/12 lg:w-10/12 md:w-10/12 justify-between'>
                <h2 className='font-semibold ml-14 small:text-sm md:text-base dark:!text-white'>
                  Nombre
                </h2>
                <h2 className='font-semibold 2xl:m-0 xl:ml-0 iPadAir:mr-1 lg:ml-1 md:mr-1 md:text-base md:m-0 small:text-sm small:mr-3 dark:!text-white'>
                  Estado
                </h2>
                <h2 className='font-semibold 2xl:mr-24 xl:mr-3 iPadAir:mr-44 lg:mr-20 md:text-base md:-mr-12 small:text-sm small:-mr-1 dark:!text-white'>
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
