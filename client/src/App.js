import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './components/Login'
import UsersList from './features/users/UserList'
import UserAdd from './features/users/UserAdd'
import SellingPointList from './features/sellingPoint/SellingPointList'
import QuestionList from './features/category/questions/QuestionList'
import SectionList from './features/category/SectionList'

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
          <Route index element={<SectionList />} />
          <Route path='edit' element={<QuestionList />} />
        </Route>
        <Route path='sellingPoint'>
          <Route index element={<SellingPointList />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
