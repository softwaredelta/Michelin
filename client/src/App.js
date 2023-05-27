import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './components/Login'
import UsersList from './features/users/UserList'
import SellingPointList from './features/sellingPoint/SellingPointList'
import QuestionList from './features/category/questions/QuestionList'
import SectionList from './features/category/SectionList'
import History from './features/history/History'
import ProtectedRoute from './utils/ProtectedRoute'
import ManagerRoute from './utils/ManagerRoute'
import Preparation from './features/form/tour/Preparation'
import Preview from './features/form/tour/Preview'
// AdminRoute in UsersList
function App () {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
      <Route path='prueba'>
        <Route index element={<Preview/>}></Route>
        <Route path='preparacion' element={<Preparation/>} />
      </Route>
        <Route index element={<ProtectedRoute> <Public /> </ProtectedRoute>} />
        <Route path='login' element={<Login />} />
        <Route path='user'>
          <Route index element={<UsersList />} />
        </Route>
        <Route path='question'>
          <Route index element={<ProtectedRoute> <ManagerRoute> <SectionList /> </ManagerRoute> </ProtectedRoute>} />
          <Route path='edit/:category/:section' element={<ProtectedRoute> <ManagerRoute> <QuestionList /> </ManagerRoute></ProtectedRoute>} />
        </Route>
        <Route path='sellingPoint'>
          <Route index element={<ProtectedRoute> <SellingPointList /> </ProtectedRoute>} />
        </Route>
        <Route path='history'>
          <Route index element={<ProtectedRoute> <History /> </ProtectedRoute>} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
