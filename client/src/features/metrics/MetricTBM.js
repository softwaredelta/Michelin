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

const MetricTBM = () => {
  const { register, getValues } = useForm()

  const [dStart] = useState('null')
  const [dEnd] = useState('null')
  const [zone, setZone] = useState('null')
  const [user, setUser] = useState('null')
  const role = localStorage.getItem('role') // eslint-disable-line

  const {
    data: mail,
    isSuccess: isSuccesMail
  } = useGetByMailQuery()
  
  const [idUser,setIdUser] = useState('null')
useEffect(() => {
    if (isSuccesMail) {
      const { entities } = mail
      setUser(entities.undefined.id_user)
      if (role == 1){ // eslint-disable-line
        setIdUser(entities.undefined.id_user)
      }
    }
  }, [isSuccesMail, mail, role])

  const {
    data: state,
    isSuccess: isSuccessState
  } = useGetStateQuery()

  let myState

  if (isSuccessState) {
    const { ids } = state

    const listContent = ids?.length
      ? ids.map((idState) => <StateOption key={idState} zoneId={idState} />)
      : null

    myState = listContent
  }

  const { data: users, isSuccess } = useGetUsersQuery()
  let myUser
  
  if (isSuccess) {
    const { ids, entities } = users
    const tableContent = ids?.length
      ? ids.map((idUser) => (
        <option key={idUser} value={entities[idUser].id_user}>
          {`${entities[idUser].name} ${entities[idUser].last_name}`}
        </option>
      ))
      : null
    myUser = tableContent
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
  const [dataTime, setDataTime] = useState()
  useEffect(() => {
    if (isSuccessTimes) {
      const { entities } = time
      setDataTime(entities.undefined)
    }
  }, [isSuccessTimes, time, user, zone])

  const {
    data: tours,
    isSuccess: isSuccessTours
  } = useGetFormsCuQuery({
    dStart,
    dEnd,
    zone,
    user
  })
  const [dataTour, setDataTour] = useState()
  useEffect(() => {
    if (isSuccessTours) {
      const { entities } = tours
      setDataTour(entities.undefined)
    }
  }, [isSuccessTours, tours, user, zone])

  const {
    data: avgGradeByMonths,
    isSuccess: isSuccessGradeByMonths
  } = useGetByAvgGradeQuery({
    dStart,
    dEnd,
    zone,
    user
  })

  const [dataAvgByMonths, setDataAvgByMonths] = useState({ name: 'Tiempo Promedio', data: [2, 3, 4, 5, 6, 5] })
  const [monthAvgByMonths, setMonthAvgByMonths] = useState(['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'])

  useEffect(() => {
    if (isSuccessGradeByMonths) {
      const { entities } = avgGradeByMonths
      setDataAvgByMonths(entities.undefined[0])
      setMonthAvgByMonths(entities.undefined[1])
    }
  }, [isSuccessGradeByMonths, avgGradeByMonths, user, zone])

  const {
    data: ToursByMonths,
    isSuccess: isSuccessToursByMonths
  } = useGetToursByMonthsQuery({
    zone,
    user
  })
  const [dataTourByMonths, setDataTourByMonths] = useState({ name: 'Tiempo Promedio', data: [2, 3, 4, 5, 6, 5] })
  const [monthTourByMonths, setMonthTourByMonths] = useState(['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'])

  useEffect(() => {
    if (isSuccessToursByMonths) {
      const { entities } = ToursByMonths
      setDataTourByMonths(entities.undefined[0])
      setMonthTourByMonths(entities.undefined[1])
    }
  }, [isSuccessToursByMonths, ToursByMonths, user, zone])

  const {
    data: TimeByMonths,
    isSuccess: isSuccessTimeByMonths
  } = useGetTimeByMonthsQuery({
    zone,
    user
  })
  const [dataTimeByMonths, setDataTimeByMonths] = useState({ name: 'Tiempo Promedio', data: [2, 3, 4, 5, 6, 5] })
  const [monthTimeByMonths, setMonthTimeByMonths] = useState(['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'])

  useEffect(() => {
    if (isSuccessTimeByMonths) {
      const { entities } = TimeByMonths
      setDataTimeByMonths(entities.undefined[0])
      setMonthTimeByMonths(entities.undefined[1])
    }
  }, [isSuccessTimeByMonths, TimeByMonths, user, zone])

  const {
    data: UserByMonths,
    isSuccess: isSuccessUserByMonths
  } = useGetFormsByMonthsUserQuery({
    zone,
    user
  })
  const [dataUserByMonths, setDataUserByMonths] = useState({ name: 'Tiempo Promedio', data: [2, 3, 4, 5, 6, 5] })
  const [monthUserByMonths, setMonthUserByMonths] = useState(['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'])

  useEffect(() => {
    if (isSuccessUserByMonths) {
      const { entities } = UserByMonths
      setDataUserByMonths(entities.undefined[0])
      setMonthUserByMonths(entities.undefined[1])
    }
  }, [isSuccessUserByMonths, UserByMonths, user, zone])

  const {
    data: AvgGradeCur,
    isSuccess: isSuccessAvgGradeCur
  } = useGetByAvgGradeCurQuery({
    dStart,
    dEnd,
    zone,
    user
  })
  const [dataAvgGradeCur, setDataAvgGradeCur] = useState({})
  const [exteriorGradeCur, setExteriorGradeCur] = useState(0)
  const [interiorGradeCur, setInteriorGradeCur] = useState(0)
  const [clientGradeCur, setClientGradeCur] = useState(0)
  const [managerGradeCur, setManagerGradeCur] = useState(0)
  useEffect(() => {
    if (isSuccessAvgGradeCur) {
      const { entities } = AvgGradeCur
      setDataAvgGradeCur(entities.undefined[0])
      setExteriorGradeCur((dataAvgGradeCur.EXTERIOR === null) ? 0 : dataAvgGradeCur.EXTERIOR)
      setInteriorGradeCur((dataAvgGradeCur.INTERIOR === null) ? 0 : dataAvgGradeCur.INTERIOR)
      setClientGradeCur((dataAvgGradeCur.CLIENT === null) ? 0 : dataAvgGradeCur.CLIENT)
      setManagerGradeCur((dataAvgGradeCur.MANAGER === null) ? 0 : dataAvgGradeCur.MANAGER)
    }
  }, [isSuccessAvgGradeCur, AvgGradeCur, user, zone, dataAvgGradeCur])

  const {
    data: AvgPDV,
    isSuccess: isSuccessAvgPDV
  } = useGetAvgPDVQuery({
    dStart,
    dEnd,
    zone,
    user
  })
  const [dataAvgPDV, setDataAvgPDV] = useState(0)

  const onFilterButtonClicked = (e) => {
    e.preventDefault()
    setZone(getValues('select_zone'))
    if(role != 1){ // eslint-disable-line
    setUser(getValues('select_user'))
    }
  }

  useEffect(() => {
    if (isSuccessAvgPDV) {
      const { entities } = AvgPDV
      setDataAvgPDV(entities.undefined)
    }
  }, [isSuccessAvgPDV, AvgPDV, zone, user])

    const selectUser = (
      <Select
        className='rounded-md lg:mt-2 lg:mb-6 xl:mt-0 xl:mb-3 dark:border-2 hidden'
        id='select_user'
        name='select_user'
        {...register('select_user')}
      >
        <option value={idUser} selected>
          Selecciona un usuario
        </option>
        {myUser}
      </Select>
    )
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
                      {myState}
                    </Select>
                  </div>
                  <div className='flex-col'>
                    {selectUser}
                  </div>
                  <div className='flex-col'>
                    <button
                      className='bg-blues-200 text-white py-2 px-4 rounded-md'
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
                    <GradeChart percent={parseInt(dataAvgPDV)} zone='' />
                  </div>
                </div>
                <div className='text-center grid grid-rows-2 text-lg text-blues-300 break-words font-bold dark:text-white'>
                  Tiempo Promedio de Recorridos al Mes
                  <p className='text-4xl'>{dataTime}</p> minutos
                </div>
                <div className='text-center grid grid-rows-2 text-lg text-blues-300 break-words font-bold dark:text-white'>
                  Número de Recorridos al Mes
                  <p className='text-4xl'>{dataTour}</p> recorridos
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
                  <Line
                    title='Promedio de Calificación por Área'
                    subtitle='Muestra el desempeño de los resultados en los recorridos.                                (Puede ser filtrada por Usuarios y Zonas)'
                    data={dataAvgByMonths}
                    months={monthAvgByMonths}
                    yAxis='Calificación'
                  />
                </div>
                <div className='flex-col border rounded-lg shadow-md'>
                  <Line
                    title='Tiempo de Recorridos'
                    subtitle='(Puede ser filtrada por Usuarios y Zonas)'
                    data={dataTimeByMonths}
                    months={monthTimeByMonths}
                    yAxis='Minutos'
                  />
                </div>
              </div>
              <div className='flex flex-row gap-1 justify-center mb-5'>
                <div className='flex-col border rounded-lg shadow-md mr-2'>
                  <Line
                    className='object-contain'
                    title='Recorridos al Mes'
                    subtitle='(Puede ser filtrada por Usuarios y Zonas)'
                    data={dataTourByMonths}
                    months={monthTourByMonths}
                    yAxis='Recorridos'
                  />
                </div>
                <div className='flex-col border rounded-lg shadow-md'>
                  <Line
                    className='object-contain'
                    title={`Recorridos por Mes de ${localStorage.getItem('name')} ${localStorage.getItem('lastName')}`}//eslint-disable-line
                    subtitle='Muestra tus recorridos (Filtra por Zonas)'
                    data={dataUserByMonths}
                    months={monthUserByMonths}
                    yAxis='Recorridos'
                  />
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

export default MetricTBM
