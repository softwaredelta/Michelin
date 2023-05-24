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
import AnsButtons from './components/AnsButtons'
import TourQuestion from './components/TourQuestion'
import ProgressBar from './components/ProgressBar'

function App () {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='prueba' element={<AnsButtons />} />
        <Route path='prueba2' element={<TourQuestion />} />
        <Route path='progressbar' element={<ProgressBar />} />
        <Route index element={<ProtectedRoute> <Public /> </ProtectedRoute>} />
        <Route path='login' element={<Login />} />
        <Route path='user'>
          <Route index element={<UsersList />} />
        </Route>
        <Route path='question'>
          <Route index element={<ProtectedRoute> <SectionList /> </ProtectedRoute>} />
          <Route path='edit/:category/:section' element={<ProtectedRoute> <QuestionList /> </ProtectedRoute>} />
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
