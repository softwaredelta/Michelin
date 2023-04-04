import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'

const User = ({ userId }) => {
  const user = useSelector(state => selectUserById(state, userId))

  if (user) {
    return (
      <tr>
        <td>{user.name}</td>
        <td>{user.last_name}</td>
      </tr>
    )
  } else return null
}

export default User
