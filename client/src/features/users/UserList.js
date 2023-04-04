import { useGetUsersQuery } from "./usersApiSlice";
import User from './User'

const UsersList = () => {
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery()
    
    let content
    if (isLoading) content =<p>Loading...</p>
    if (isError){
        content = <p>{error?.data?.message}</p>
    }
    
    if (isSuccess){
        const {ids} = users
        console.log(users)
        const tableContent = ids?.length
            ? ids.map(id_user => <User key={id_user} userId ={id_user}/>)
            : null
        content = (
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
        )
    }
    return content
}

export default UsersList