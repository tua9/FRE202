import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import AccountListPage from '../pages/AccountListPage'
import AccountDetailPage from '../pages/AccountDetailPage'
import ProtectedLayout from '../components/ProtectedLayout' // ← thêm dòng này

function AppRoutes() {
  return (
    <Routes>
      {/* Trang công khai - không cần Navbar */}
      <Route path='/' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />

      {/* Các trang cần đăng nhập - có Navbar */}
      <Route element={<ProtectedLayout />}>
        <Route path='/accounts' element={<AccountListPage />} />
        <Route path='/accounts/:id' element={<AccountDetailPage />} />
      </Route>

      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  )
}

export default AppRoutes
