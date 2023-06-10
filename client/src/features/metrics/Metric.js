/* import React, { useState, useEffect } from 'react'
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
  useGetFormsByMonthsUserQuery
} from '../../services/metricApiSlice'
import { useGetUsersQuery } from '../../services/usersApiSlice'
import GradeChart from '../../components/inputs/GradeChart'

/*
 * Link a requerimientos funcionales:
 * https://docs.google.com/spreadsheets/d/1Eme0YIj9GZCc3QCBQehDUGZIgS7aTilZx4oUy35dcGc/edit?usp=sharing
 */

// Historia de usuario M5_H1
/*
const Metric = () => {
  const { register, getValues, reset } = useForm()

  const [dStart, setDStart] = useState(null)
  const [dEnd, setDEnd] = useState(null)
  const [zone, setZone] = useState(null)
  const [user, setUser] = useState(null)

  const {
    data: state,
    isSuccess: isSuccessState,
    isError: isErrorState
  } = useGetStateQuery()

  let myState

  if (isSuccessState) {
    const { ids } = state

    const listContent = ids?.length
      ? ids.map((idState) => <StateOption key={idState} zoneId={idState} />)
      : null

    myState = listContent
  }

  const { data: users, isLoading, isSuccess, isError } = useGetUsersQuery()
  let myUser
  if (isSuccess) {
    const { ids, entities } = users
    const tableContent = ids?.length
      ? ids.map((idUser) => (
        <option key={idUser} value={entities[idUser].id_user}>
          {' '}
          {`${entities[idUser].name} ${entities[idUser].last_name}`}
        </option>
      ))
      : null
    myUser = tableContent
  }

  const {
    data: time,
    isLoading: isLoadingTimes,
    isSuccess: isSuccessTimes,
    isError: isErrorTimes
  } = useGetByAvgTimeQuery({
    dStart,
    dEnd,
    zone,
    user
  })
  const [dataTime, setDataTime] = useState()
  useEffect(() => {
    if (isSuccessTimes) {
      const { ids, entities } = time
      setDataTime(entities.undefined)
    }
  }, [isSuccessTimes])

  const {
    data: tours,
    isLoading: isLoadingTours,
    isSuccess: isSuccessTours,
    isError: isErrorTours
  } = useGetFormsCuQuery({
    dStart,
    dEnd,
    zone,
    user
  })
  const [dataTour, setDataTour] = useState()
  useEffect(() => {
    if (isSuccessTours) {
      const { ids, entities } = tours
      setDataTour(entities.undefined)
    }
  }, [isSuccessTours])

  const {
    data: avgGradeByMonths,
    isLoading: isLoadingGradeByMonths,
    isSuccess: isSuccessGradeByMonths,
    isError: isErrorGradeByMonths
  } = useGetByAvgGradeQuery({
    dStart,
    dEnd,
    zone,
    user
  })
  let dataAvgByMonths
  let monthAvgByMonths
  if (isSuccessGradeByMonths) {
    const { ids, entities } = avgGradeByMonths
    dataAvgByMonths = entities.undefined[0]
    monthAvgByMonths = entities.undefined[1]
  }

  const {
    data: ToursByMonths,
    isLoading: isLoadingToursByMonths,
    isSuccess: isSuccessToursByMonths,
    isError: isErrorToursByMonths
  } = useGetToursByMonthsQuery({
    zone,
    user
  })
  let dataToursByMonths
  let monthToursByMonths
  if (isSuccessToursByMonths) {
    const { ids, entities } = ToursByMonths
    dataToursByMonths = entities.undefined[0]
    monthToursByMonths = entities.undefined[1]
  }

  const {
    data: TimeByMonths,
    isLoading: isLoadingTimeByMonths,
    isSuccess: isSuccessTimeByMonths,
    isError: isErrorTimeByMonths
  } = useGetTimeByMonthsQuery({
    zone,
    user
  })
  let dataTimeByMonths
  let monthTimeByMonths
  if (isSuccessTimeByMonths) {
    const { ids, entities } = TimeByMonths

    dataTimeByMonths = entities.undefined[0]
    monthTimeByMonths = entities.undefined[1]
  }

  const {
    data: UserByMonths,
    isLoading: isLoadingUserByMonths,
    isSuccess: isSuccessUserByMonths,
    isError: isErrorUserByMonths
  } = useGetFormsByMonthsUserQuery({
    zone,
    user
  })
  let dataUserByMonths
  let monthUserByMonths
  if (isSuccessUserByMonths) {
    const { ids, entities } = UserByMonths
    dataUserByMonths = entities.undefined[0]
    monthUserByMonths = entities.undefined[1]
  }

  const {
    data: AvgGradeCur,
    isLoading: isLoadingAvgGradeCur,
    isSuccess: isSuccessAvgGradeCur,
    isError: isErrorAvgGradeCur
  } = useGetByAvgGradeCurQuery({
    dStart,
    dEnd,
    zone,
    user
  })
  let dataAvgGradeCur

  const [exteriorGradeCur, setExteriorGradeCur] = useState(0)
  const [interiorGradeCur, setInteriorGradeCur] = useState(0)
  const [clientGradeCur, setClientGradeCur] = useState(0)
  const [managerGradeCur, setManagerGradeCur] = useState(0)
  useEffect(() => {
    if (isSuccessAvgGradeCur) {
      const { ids, entities } = AvgGradeCur
      dataAvgGradeCur = entities.undefined[0]
      setExteriorGradeCur(dataAvgGradeCur.EXTERIOR)
      setInteriorGradeCur(dataAvgGradeCur.INTERIOR)
      setClientGradeCur(dataAvgGradeCur.CLIENT)
      setManagerGradeCur(dataAvgGradeCur.MANAGER)
    }
  }, [isSuccessAvgGradeCur])

  const {
    data: AvgPDV,
    isLoading: isLoadingAvgPDV,
    isSuccess: isSuccessAvgPDV,
    isError: isErrorAvgPDV
  } = useGetAvgPDVQuery({
    dStart,
    dEnd,
    zone,
    user
  })
  const [dataAvgPDV, setDataAvgPDV] = useState(0)

  useEffect(() => {
    if (isSuccessAvgPDV) {
      const { ids, entities } = AvgPDV
      setDataAvgPDV(entities.undefined)
    }
  }, [isSuccessAvgPDV, AvgPDV])

  const onFilterButtonClicked = () => {
    setDStart()
    setDEnd()
    setZone(getValues('select_zone'))
    setUser()
  }

  // recorrido month-section
  // section-calificacion

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
                  onSubmit={onFilterButtonClicked}
                  className='w-full flex flex-row gap-6 justify-center'
                >
                  <div className='flex-col'>
                    <Select
                      className='rounded-md lg:mt-2 lg:mb-6 xl:mt-0 xl:mb-3 dark:border-2'
                      id='select_zone'
                      name='select_zone'
                      {...register('select_zone')}
                    >
                      <option value='' selected>
                        Selecciona un estado
                      </option>
                      {myState}
                    </Select>
                  </div>
                  <div className='flex-col'>
                    <Select
                      className='rounded-md lg:mt-2 lg:mb-6 xl:mt-0 xl:mb-3 dark:border-2'
                      id='select_user'
                      name='select_user'
                      {...register('select_user')}
                    >
                      <option value='' selected>
                        Selecciona un usuario
                      </option>
                      {myUser}
                    </Select>
                  </div>
                  <div className='flex-col'>
                    <button
                      className='bg-blues-200 text-white py-2 px-4 rounded-md'
                      type='submit'
                    >
                      Filtrar
                    </button>
                  </div>
                </form>
              </div>
              <div className='w-11/12 grid grid-cols-3 gap-10 justify-center m-auto border-2 py-3 mb-6 mt-4 rounded-md shadow-md'>
                <div className='text-center grid grid-rows-2 text-lg text-blues-300 break-words font-bold'>
                  Promedio de Calificación de Puntos de Venta
                  <GradeChart percent={parseInt(dataAvgPDV)} zone='' />
                </div>
                <div className='text-center grid grid-rows-2 text-lg text-blues-300 break-words font-bold'>
                  Tiempo Promedio de Recorridos al Mes
                  <p className='text-4xl'>{dataTime}</p> minutos
                </div>
                <div className='text-center grid grid-rows-2 text-lg text-blues-300 break-words font-bold'>
                  Numero de Recorridos al Mes
                  <p className='text-4xl'>{dataTour}</p> recorridos
                </div>
              </div>
              <div className='w-11/12 grid grid-cols-4 gap-4 justify-center m-auto border-2 py-3 mb-6 mt-4 rounded-md shadow-md'>
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
                <div className='flex-col border rounded-lg shadow-md'>
                  <Line
                    title='Promedio de Calificación por Área'
                    data={dataAvgByMonths}
                    months={monthAvgByMonths}
                  />
                </div>
              </div>
              <div className='flex flex-row gap-1 justify-center mb-5'>
                <div className='flex-col border rounded-lg shadow-md'>
                  <Line
                    className='object-contain'
                    title='Recorridos al Mes'
                    data={dataToursByMonths}
                    months={monthToursByMonths}
                  />
                </div>
              </div>
              <div className='flex flex-row w-full gap-2 justify-center mb-5'>
                <div className='flex-col border rounded-lg shadow-md'>
                  <Line
                    className='object-contain'
                    title='Recorridos de TBM por mes'
                    data={dataUserByMonths}
                    months={monthUserByMonths}
                  />
                </div>
              </div>
              <div className='w-full flex flex-row justify-center mb-5'>
                <div className='flex-col border rounded-lg shadow-md'>
                  <Line
                    title='Tiempo de Recorridos'
                    data={dataTimeByMonths}
                    months={monthTimeByMonths}
                  />
                </div>
              </div>
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
*/
