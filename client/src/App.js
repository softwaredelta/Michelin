import { Routes, Route } from 'react-router-dom'
import Public from './features/screen/Public'
import Login from './features/screen/Login'
import UsersList from './features/users/UserList'
import SellingPointList from './features/sellingPoint/SellingPointList'
import QuestionList from './features/category/questions/QuestionList'
import SectionList from './features/category/SectionList'
import History from './features/history/History'
import ProtectedRoute from './utils/ProtectedRoute'
import ManagerRoute from './utils/ManagerRoute'
import FormStart from './features/form/FormStart'
import Preparation from './features/form/tour/Preparation'
import Exterior from './features/form/tour/Exterior'
import Interior from './features/form/tour/Interior'
import Client from './features/form/tour/Client'
import Finalize from './features/form/tour/Finalize'
import Manager from './features/form/tour/Manager'
import Metric from './features/metrics/Metric'


// AdminRoute in UsersList
function App () {
  return (
    <Routes>
      <Route path='/'>
        <Route
          index element={
            <ProtectedRoute>
              <Public />
            </ProtectedRoute>
            }
        />
        <Route path='home'>
          <Route
            index
            element={
              <ProtectedRoute>
                <Public />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path='login' element={<Login />} />
        <Route path='user'>
          <Route
            index element={
              <ProtectedRoute>
                <UsersList />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path='question'>
          <Route
            index
            element={
              <ProtectedRoute>
                <ManagerRoute>
                  <SectionList />
                </ManagerRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path='edit/:category/:section'
            element={
              <ProtectedRoute>
                <ManagerRoute>
                  <QuestionList />
                </ManagerRoute>
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path='sellingPoint'>
          <Route
            index
            element={
              <ProtectedRoute>
                <SellingPointList />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path='history'>
          <Route
            index
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path='metric'>
          <Route
            index
            element={
              <ProtectedRoute>
                <Metric />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path='form'>
          <Route
            index
            element={
              <ProtectedRoute>
                <FormStart />
              </ProtectedRoute>
            }
          />
          <Route
            path='preparation'
            element={
              <ProtectedRoute>
                <Preparation />
              </ProtectedRoute>
            }
          />
          <Route
            path='exterior'
            element={
              <ProtectedRoute>
                <Exterior />
              </ProtectedRoute>
            }
          />
          <Route
            path='interior'
            element={
              <ProtectedRoute>
                <Interior />
              </ProtectedRoute>
            }
          />
          <Route
            path='client'
            element={
              <ProtectedRoute>
                <Client />
              </ProtectedRoute>
            }
          />
          <Route
            path='manager'
            element={
              <ProtectedRoute>
                <Manager />
              </ProtectedRoute>
            }
          />
          <Route
            path='finalize'
            element={
              <ProtectedRoute>
                <Finalize />
              </ProtectedRoute>
            }
          />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
