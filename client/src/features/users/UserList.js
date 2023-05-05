import { useGetUsersQuery } from './usersApiSlice'
import User from './User'
import Bluebutton from '../../components/Bluebutton'
import { useState } from 'react'
import UserAdd from './UserAdd'
import NavBar from '../../components/NavBar'
import ModifiedFooter from '../../components/ModifiedFooter'

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUsersQuery()

  let content
  if (isLoading) content = <p>Loading...</p>
  if (isError) {
    content = <p>{error?.data?.message}</p>
  }

  const [show, setShow] = useState(false)

  const handleSetShow = () => {
    setShow(true)
  }

  const handleClose = () => {
    setShow(false)
  }
  let tableContent

  if (isSuccess) {
    const { ids } = users
    tableContent = ids?.length
      ? ids.map(idUser => <User key={idUser} userId={idUser} />)
      : null
  }
  content = (
    <>
      <div>
        <NavBar />
        <div className='pt-20 w-full h-screen flex flex-col items-center'>
          <Bluebutton myText='+ Nuevo Usuario' method={handleSetShow} />
          <div className='content-center grid grid-cols-5 gap-10 w-8/12 ml-2 mb-6 py-4 border-b-2'>
            <h2 className='font-semibold text-center ml-20'>Rol</h2>
            <h2 className='font-semibold text-center ml-14'>Nombre</h2>
            <h2 className='font-semibold text-center ml-2'>Zona</h2>
            <h2 className='font-semibold text-center mr-2'>Número de Reportes</h2>
            <h2 className='font-semibold text-center mr-20'>Manager</h2>
          </div>
          <div className='h-3/5 overflow-y-scroll'>
            {tableContent}
          </div>
          <div className='container flex flex-wrap justify-items-stretch' />
          <ModifiedFooter />
        </div>
      </div>
      <UserAdd
        show={show}
        onClose={handleClose}
      />
    </>
  )

  return content
}

export default UsersList
