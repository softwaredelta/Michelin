import { useGetUsersQuery } from './usersApiSlice'
import User from './User'
import Bluebutton from '../../components/Bluebutton'
import { useState } from 'react'
import UserAdd from './UserAdd'
import NavBar from '../../components/NavBar'
import ModifiedFooter from '../../components/ModifiedFooter'

const UsersList = () => {
  const { data: users, isLoading, isSuccess, isError } = useGetUsersQuery()

  const [show, setShow] = useState(false)

  let tableContent
  let message

  const handleSetShow = () => {
    setShow(true)
  }

  const handleClose = () => {
    setShow(false)
  }

  if (isLoading) message = <p>Loading...</p>

  if (isError) {
    message = (
      <p className='text-3xl font-semibold dark:!text-white'>
        No hay conexion con la base de datos
      </p>
    )
  }

  if (isSuccess) {
    const { ids } = users

    if (ids.length === 0) {
      message = (
        <p className='text-3xl font-semibold dark:!text-white'>
          No hay usuarios que mostrar
        </p>
      )
    }

    tableContent = ids?.length
      ? ids.map((idUser) => <User key={idUser} userId={idUser} />)
      : null
  }

  const content = (
    <>
      <div>
        <NavBar />
        <div className='pt-20 w-full h-screen flex flex-col items-center bg-gradient-to-b from-white to-gray-100 dark:!bg-gradient-to-b dark:!from-blues-500 dark:!to-blues-500'>
          <Bluebutton myText='+ Nuevo Usuario' method={handleSetShow} />
          <div className='content-center grid grid-cols-5 2xl:gap-10 lg:gap-12 2xl:w-8/12 lg:w-10/12 2xl:ml-2 lg:ml-5 mb-6 py-4 border-b-2 dark:border-blues-200'>
            <h2 className='font-semibold text-center 2xl:ml-20 iPadAir:ml-28 lg:ml-12 dark:!text-white'>
              Rol
            </h2>
            <h2 className='font-semibold text-center 2xl:ml-14 iPadAir:ml-16 lg:ml-5 dark:!text-white'>
              Nombre
            </h2>
            <h2 className='font-semibold text-center 2xl:ml-2 iPadAir:mr-2 lg:m-0 dark:!text-white'>
              Zona
            </h2>
            <h2 className='font-semibold text-center 2xl:mr-2 iPadAir:mr-16 lg:mr-5 dark:!text-white'>
              Número de Reportes
            </h2>
            <h2 className='font-semibold text-center 2xl:mr-20 iPadAir:mr-40 lg:mr-12 dark:!text-white'>
              Mánager
            </h2>
          </div>
          <div className='h-4/5 overflow-y-scroll'>
            {tableContent}
            {message}
          </div>
          <div className='container flex flex-wrap justify-items-stretch' />
          <ModifiedFooter />
        </div>
      </div>
      <UserAdd show={show} onClose={handleClose} />
    </>
  )
  return content
}

export default UsersList
