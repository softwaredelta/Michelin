import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './components/Login'
import UsersList from './features/users/UserList'
import UserAdd from './features/users/UserAdd'
import QuestionAdd from './features/category/questions/QuestionAdd'
import SellingPointList from './features/sellingPoint/SellingPointList'

function App () {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Public />} />
        <Route path='login' element={<Login />} />
        <Route path='user'>
          <Route index element={<UsersList />} />
          <Route path='new' element={<UserAdd />} />
        </Route>
        <Route path='question'>
          <Route path='new' element={<QuestionAdd />} />
        </Route>
        <Route path='sellingPoint'>
          <Route index element={<SellingPointList />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
