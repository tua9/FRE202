import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import AccountListPage from '../pages/AccountListPage'
import AccountDetailPage from '../pages/AccountDetailPage'
import RegisterPage from '../pages/RegisterPage'

function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/accounts' element={<AccountListPage />} />
      <Route path='/accounts/:id' element={<AccountDetailPage />} />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  )
}

export default AppRoutes
