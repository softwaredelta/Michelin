import React, { useState } from 'react';
import NavBar from '../../components/headers/NavBar';
import Header from '../../components/headers/Header';
import ModifiedFooter  from '../../components/headers/ModifiedFooter';
import Line from '../../components/charts/Line'
import { useForm } from 'react-hook-form';
import StateOption from '../sellingPoint/state/StateOption';
import { Select } from 'flowbite-react';
import { useGetStateQuery } from '../../services/stateApiSlice';
import { useGetByAvgTimeQuery, useGetByAvgGradeQuery } from '../../services/metricApiSlice';
import { useGetUsersQuery } from '../../services/usersApiSlice';

const Metric = () => {
  const { register, getValues, reset } = useForm()


  const [dStart,setDStart] = useState(null)
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
      ? ids.map((idUser) => <option key={idUser} value={entities[idUser].id_user} > {`${entities[idUser].name} ${entities[idUser].last_name}`}</option>)
      : null
    myUser = tableContent
  }

  const {
    data: time,
    isLoading: isLoadingTimes,
    isSuccess: isSuccessTimes,
    isError: isErrorTimes
  } = useGetByAvgTimeQuery({ dStart:dStart,dEnd:dEnd,zone:zone,user:user})

  const {
    data: grades,
    isLoading: isLoadingGrades,
    isSuccess: isSuccessGrades,
    isError: isErrorGrades
  } = useGetByAvgGradeQuery({dStart:dStart,dEnd:dEnd,zone:zone,user:user})

  console.log(grades)

  const onFilterButtonClicked = () =>{
    setDStart()
    setDEnd()
    setZone(getValues('select_zone'))
    setUser()
  }

  const months = ["January","Febraury","March","April","May","June"]
  const data = []
  data.push({name: "Exterior",data: [70,80,20,30,20,30]})
  data.push({name: "Interior",data: [60,20,20,30,20,30]})
  

  //recorrido month-section
  //section-calificacion
  
    const content = (
        <>
          <div>
        <NavBar />
        <div className='pt-20 w-full h-screen flex flex-col items-center bg-gradient-to-b from-white to-gray-100 dark:!bg-gradient-to-b dark:!from-blues-500 dark:!to-blues-500'>
          <Header myText='Métricas' />
          <div className='container pt-5 h-screen overflow-y-hidden w-10/12 items-center bg-white rounded-2xl'>
            <div className='content-start w-full ml-0 mb-6 py-4 border-b-2 bg-white rounded-2xl'>
              <div className='flex flex-row xl:w-9/12 lg:w-10/12 md:w-10/12 justify-between bg-white rounded-2xl'>
              <div>
              <form onSubmit={onFilterButtonClicked}>
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

                <button
                className='bg-blues-200 text-white py-2 px-4 rounded-md'
                type='submit'
                >
                  Filtrar
                </button>
                </form>
                </div>
                <div>
                <Line title={'Promedio de Califación por Área'} data={data} months={months}/>
                </div>
              </div>
            </div>
          </div>
          <ModifiedFooter />
        </div>
      </div>  
            
        </>
    )
    return content;
}

export default Metric