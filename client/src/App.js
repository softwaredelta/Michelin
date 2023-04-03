import {Routes, Route} from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './components/Login'
import UsersList from './features/users/UserList'
import NewUserForm from './features/users/NewUserForm'

function App () {
  return (
   <Routes>
    <Route path="/" element ={<Layout />}>
      <Route index element= {<Public />}/>
      <Route path="login" element={<Login />}/>
      <Route path="user">
        <Route index element={<UsersList />}/>
        <Route path="new" element={<NewUserForm />} />
      </Route>
    </Route>
   </Routes>
  )
}

export default App
