import { useGetUsersQuery } from './usersApiSlice'
import User from './User'
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

  if (isSuccess) {
    const { ids } = users
    console.log(users)
    const tableContent = ids?.length
      ? ids.map(idUser => <User key={idUser} userId={idUser} />)
      : null
    content = tableContent

    content = (
      <>
        <div>
          <NavBar />
          <div className='pt-20 w-ful h-screen flex flex-col items-center'>
            {content}
            <div className='container flex flex-wrap justify-items-stretch' />
            <ModifiedFooter />
          </div>
        </div>
      </>
    )
  }
  return content
}

export default UsersList
