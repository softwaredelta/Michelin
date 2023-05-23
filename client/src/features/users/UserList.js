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
        <div className='pt-20 w-full h-screen flex flex-col items-center dark:!bg-blues-400'>
          <Bluebutton myText='+ Nuevo Usuario' method={handleSetShow} />
          <div className='content-center grid grid-cols-5 gap-10 w-8/12 ml-2 mb-6 py-4 border-b-2 dark:border-blues-200'>
            <h2 className='font-semibold text-center ml-20 dark:!text-white'>
              Rol
            </h2>
            <h2 className='font-semibold text-center ml-14 dark:!text-white'>
              Nombre
            </h2>
            <h2 className='font-semibold text-center ml-2 dark:!text-white'>
              Zona
            </h2>
            <h2 className='font-semibold text-center mr-2 dark:!text-white'>
              Número de Reportes
            </h2>
            <h2 className='font-semibold text-center mr-20 dark:!text-white'>
              Manager
            </h2>
          </div>
          <div className='h-3/5 overflow-y-scroll'>
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
