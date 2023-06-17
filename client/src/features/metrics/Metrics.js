import React, { useState, useEffect } from 'react'
import NavBar from '../../components/headers/NavBar'
import Header from '../../components/headers/Header'
import ModifiedFooter from '../../components/headers/ModifiedFooter'
import Line from '../../components/charts/Line'
import { useForm } from 'react-hook-form'
import StateOption from '../sellingPoint/state/StateOption'
import { Select } from 'flowbite-react'
import { useGetStateQuery } from '../../services/stateApiSlice'
import {
  useGetByAvgTimeQuery,
  useGetByAvgGradeQuery,
  useGetToursByMonthsQuery,
  useGetByAvgGradeCurQuery,
  useGetAvgPDVQuery,
  useGetFormsCuQuery,
  useGetTimeByMonthsQuery,
  useGetFormsByMonthsUserQuery,
  useGetByMailQuery
} from '../../services/metricApiSlice'
import { useGetUsersQuery } from '../../services/usersApiSlice'
import GradeChart from '../../components/inputs/GradeChart'
/*
 * Link a requerimientos funcionales:
 * https://docs.google.com/spreadsheets/d/1Eme0YIj9GZCc3QCBQehDUGZIgS7aTilZx4oUy35dcGc/edit?usp=sharing
 */

// Historia de usuario M5_H1

const Metric = () => {
  const { register, getValues } = useForm()

  const [dStart] = useState('null')
  const [dEnd] = useState('null')
  const [zone, setZone] = useState('null')
  const [user, setUser] = useState('null')
  const role = localStorage.getItem('role') // eslint-disable-line

  let stateListContent
  let userListContent
  let selectUser

  let gradeChartContent
  let avgTimeContent
  let toursCuMonthContent

  let exteriorGradeCur
  let interiorGradeCur
  let clientGradeCur
  let managerGradeCur

  let gradeByAreaChartContent
  let timeByMonthsChartContent
  let userByMonthsChartContent
  let toursByMonthsChartContent

  const {
    data: mail,
    isSuccess: isSuccessMail
  } = useGetByMailQuery()

  const {
    data: users,
    isSuccess: isSuccessUser
  } = useGetUsersQuery()

  if (isSuccessUser) {
    const { ids, entities } = users
    const listContent = ids?.length
      ? ids.map((idUser) => { // eslint-disable-line// eslint-disable-line
        return (
          <option key={idUser} value={entities[idUser].id_user}>
            {`${entities[idUser].name} ${entities[idUser].last_name}`}
          </option>
        )
      })
      : null
    userListContent = listContent
  }
  if (role == 2 || role == 3){ //eslint-disable-line
    selectUser = (
      <Select
        className='rounded-md lg:mt-2 lg:mb-6 xl:mt-0 xl:mb-3 dark:border-2'
        id='select_user'
        name='select_user'
        {...register('select_user')}
      >
        <option value='null' selected>
          Selecciona un usuario
        </option>
        {userListContent}
      </Select>
    )
  }

  const {
    data: state,
    isSuccess: isSuccessState
  } = useGetStateQuery()

  if (isSuccessState) {
    const { ids } = state
    const listContent = ids?.length
      ? ids.map((idState) => <StateOption key={idState} zoneId={idState} />)
      : null
    stateListContent = listContent
  }

  const {
    data: avgPDV,
    isSuccess: isSuccessAvgPDV
  } = useGetAvgPDVQuery({
    dStart,
    dEnd,
    zone,
    user
  })

  if (isSuccessAvgPDV) {
    const { entities } = avgPDV
    const currentGradeChartContent = <GradeChart percent={parseInt(entities.undefined)} zone='' />
    gradeChartContent = currentGradeChartContent
  }

  const {
    data: time,
    isSuccess: isSuccessTimes
  } = useGetByAvgTimeQuery({
    dStart,
    dEnd,
    zone,
    user
  })

  if (isSuccessTimes) {
    const { entities } = time
    const currentTime = parseInt(entities.undefined)
    avgTimeContent = currentTime
  }

  const {
    data: toursCuMonth,
    isSuccess: isSuccesstoursCuMonth
  } = useGetFormsCuQuery({
    dStart,
    dEnd,
    zone,
    user
  })

  if (isSuccesstoursCuMonth) {
    const { entities } = toursCuMonth
    const cuTours = parseInt(entities.undefined)
    toursCuMonthContent = cuTours
  }

  const {
    data: AvgGradeCur,
    isSuccess: isSuccessAvgGradeCur
  } = useGetByAvgGradeCurQuery({
    dStart,
    dEnd,
    zone,
    user
  })

  if (isSuccessAvgGradeCur) {
    const { entities } = AvgGradeCur
    const dataAvgGradeCur = (entities.undefined[0])
    exteriorGradeCur = ((dataAvgGradeCur.EXTERIOR === null) ? 0 : dataAvgGradeCur.EXTERIOR)
    interiorGradeCur = ((dataAvgGradeCur.INTERIOR === null) ? 0 : dataAvgGradeCur.INTERIOR)
    clientGradeCur = ((dataAvgGradeCur.CLIENT === null) ? 0 : dataAvgGradeCur.CLIENT)
    managerGradeCur = ((dataAvgGradeCur.MANAGER === null) ? 0 : dataAvgGradeCur.MANAGER)
  }

  const {
    data: avgGradeByMonths,
    isSuccess: isSuccessGradeByMonths
  } = useGetByAvgGradeQuery({
    dStart,
    dEnd,
    zone,
    user
  })

  if (isSuccessGradeByMonths) {
    const { entities } = avgGradeByMonths
    const currentGradeByAreaChartContent = (
      <Line
        title='Promedio de Calificación por Área'
        subtitle='Muestra el desempeño de los resultados en los recorridos.                                (Puede ser filtrada por Usuarios y Zonas)'
        data={entities.undefined[0]}
        months={entities.undefined[1]}
      />
    )
    gradeByAreaChartContent = currentGradeByAreaChartContent
  }

  const {
    data: timeByMonths,
    isSuccess: isSuccessTimeByMonths
  } = useGetTimeByMonthsQuery({
    zone,
    user
  })

  if (isSuccessTimeByMonths) {
    const { entities } = timeByMonths
    const currentTimeByMonthsChartContent = (
      <Line
        title='Tiempo de Recorridos'
        subtitle='(Puede ser filtrada por Usuarios y Zonas)'
        data={entities.undefined[0]}
        months={entities.undefined[1]}
        yAxis='Minutos'
      />
    )
    timeByMonthsChartContent = currentTimeByMonthsChartContent
  }

  const {
    data: toursByMonths,
    isSuccess: isSuccessToursByMonths
  } = useGetToursByMonthsQuery({
    zone,
    user
  })

  if (isSuccessToursByMonths) {
    const { entities } = toursByMonths

    const currentToursByMonthsChartContent = (
      <Line
        className='object-contain'
        title='Recorridos al Mes'
        subtitle='(Puede ser filtrada por Usuarios y Zonas)'
        data={entities.undefined[0]}
        months={entities.undefined[1]}
        yAxis='Recorridos'
      />
    )
    toursByMonthsChartContent = currentToursByMonthsChartContent
  }

  const {
    data: UserByMonths,
    isSuccess: isSuccessUserByMonths
  } = useGetFormsByMonthsUserQuery({
    zone,
    user
  })

  if (isSuccessUserByMonths) {
    const { entities } = UserByMonths
    const currentUserByMonthsContent = (
      <Line
        className='object-contain'
      title={`Recorridos por Mes de ${localStorage.getItem('name')} ${localStorage.getItem('lastName')}`} //eslint-disable-line
        subtitle='Muestra tus recorridos (Filtra por Zonas)'
        data={entities.undefined[0]}
        months={entities.undefined[1]}
        yAxis='Recorridos'
      />
    )
    userByMonthsChartContent = currentUserByMonthsContent
  }

  const onFilterButtonClicked = (e) => {
    e.preventDefault()
    setZone(getValues('select_zone'))
    if(role != 1){ // eslint-disable-line
      setUser(getValues('select_user'))
    }
  }

  useEffect(() => {
    if(isSuccessMail && role == 1){ // eslint-disable-line
      const { entities } = mail
      setUser(entities.undefined.id_user)
    }
  }, [isSuccessMail, mail, role])

  const content = (
    <>
      <div>
        <NavBar />
        <div className='pt-24 w-full h-screen flex flex-col items-center bg-gradient-to-b from-white to-gray-100 dark:!bg-gradient-to-b dark:!from-blues-500 dark:!to-blues-500'>
          <Header myText='Métricas' />
          <div className='container h-screen overflow-y-scroll w-10/12 items-center bg-white rounded-2xl'>
            <div className='content-start w-full ml-0 mb-6 bg-white rounded-2xl'>
              <div className='rounded-2xl border-blues-400 w-full'>
                <form
                  className='w-full flex flex-row gap-6 justify-center'

                >
                  <div className='flex-col text-lg text-center text-blues-300 break-words font-bold'>
                    Estos registros son de los últimos 6 meses
                  </div>
                  <div className='flex-col'>
                    <Select
                      className='rounded-md lg:mt-2 lg:mb-6 xl:mt-0 xl:mb-3 dark:border-2'
                      id='select_zone'
                      name='select_zone'
                      {...register('select_zone')}
                    >
                      <option value='null' selected>
                        Selecciona un estado
                      </option>
                      {stateListContent}
                    </Select>
                  </div>
                  <div className='flex-col'>
                    {selectUser}
                  </div>
                  <div className='flex-col'>
                    <button
                      className='bg-blues-200 text-white py-2 px-4 rounded-md '
                      onClick={onFilterButtonClicked}
                    >
                      Filtrar
                    </button>
                  </div>
                </form>
              </div>
              <div className='w-11/12 grid grid-cols-3 gap-10 justify-center m-auto border-2 py-3 mb-6 mt-4 rounded-md shadow-md dark:bg-slate-700'>
                <div className='text-center grid grid-rows-2 text-lg text-blues-300 break-words font-bold dark:text-white'>
                  Promedio de Calificación de Punto de Venta
                  <div>
                    {gradeChartContent}
                  </div>
                </div>
                <div className='text-center grid grid-rows-2 text-lg text-blues-300 break-words font-bold dark:text-white'>
                  Tiempo Promedio de Recorridos al Mes
                  <p className='text-4xl'>{avgTimeContent}</p> minutos
                </div>
                <div className='text-center grid grid-rows-2 text-lg text-blues-300 break-words font-bold dark:text-white'>
                  Número de Recorridos al Mes
                  <p className='text-4xl'>{toursCuMonthContent}</p> recorridos
                </div>
              </div>
              <div className='w-11/12 grid grid-cols-4 gap-4 justify-center m-auto border-2 py-3 mb-6 mt-4 rounded-md shadow-md dark:bg-slate-700'>

                <div className='text-center caption-bottom grid grid-rows-1 text-lg text-blues-300 break-words font-bold'>
                  <GradeChart
                    percent={parseInt(exteriorGradeCur)}
                    zone='EXTERIOR'
                  />
                </div>
                <div className='text-center grid grid-rows-1 text-lg text-blues-300 break-words font-bold'>
                  <GradeChart
                    percent={parseInt(interiorGradeCur)}
                    zone='INTERIOR'
                  />
                </div>
                <div className='text-center grid grid-rows-1 text-lg text-blues-300 break-words font-bold'>
                  <GradeChart
                    percent={parseInt(clientGradeCur)}
                    zone='CLIENTE'
                  />
                </div>
                <div className='text-center grid grid-rows-1 text-lg text-blues-300 break-words font-bold'>
                  <GradeChart
                    percent={parseInt(managerGradeCur)}
                    zone='GERENTE'
                  />
                </div>
              </div>
              <div className='w-full flex flex-row justify-center mb-5'>
                <div className='flex-col border rounded-lg shadow-md mr-2'>
                  {gradeByAreaChartContent}
                </div>
                <div className='flex-col border rounded-lg shadow-md'>
                  {timeByMonthsChartContent}
                </div>
              </div>
              <div className='flex flex-row gap-1 justify-center mb-5'>
                <div className='flex-col border rounded-lg shadow-md mr-2'>
                  {toursByMonthsChartContent}
                </div>
                <div className='flex-col border rounded-lg shadow-md'>
                  {userByMonthsChartContent}
                </div>
              </div>
              <div className='flex flex-row w-full gap-2 justify-center mb-5' />
              <div className='w-full flex flex-row justify-center mb-5' />
            </div>
          </div>
          <ModifiedFooter />
        </div>
      </div>
    </>
  )
  return content
}

export default Metric
