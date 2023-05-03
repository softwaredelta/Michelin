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
    console.log(users)
    tableContent = ids?.length
      ? ids.map(idUser => <User key={idUser} userId={idUser} />)
      : null
  }
  content = (
    <>
      <div>
        <NavBar />
        <div className='pt-20 w-ful h-screen flex flex-col items-center'>
          <Bluebutton myText='+ Nuevo Usuario' method={handleSetShow} />
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Last Name</th>
              </tr>
            </thead>
            <tbody>
              {tableContent}
            </tbody>
          </table>
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
