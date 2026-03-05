// src/components/Navbar.jsx
import { useNavigate } from 'react-router-dom'
import { Navbar as BSNavbar, Nav, Container, Button } from 'react-bootstrap'
import { useAccount } from '../contexts/AccountContext' // điều chỉnh đường dẫn nếu cần

function Navbar() {
  const { state, dispatch } = useAccount()
  const { currentUser } = state
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
    // Có thể xóa token/localStorage nếu bạn dùng
    // localStorage.removeItem('token');
    navigate('/')
  }

  // Nếu chưa đăng nhập → không render Navbar (hoặc render phiên bản khác)
  if (!currentUser) return null

  return (
    <BSNavbar bg='dark' variant='dark' expand='lg' className='mb-4'>
      <Container>
        <BSNavbar.Brand href='/accounts'>Account Management</BSNavbar.Brand>

        <BSNavbar.Toggle aria-controls='basic-navbar-nav' />

        <BSNavbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='/accounts'>Danh sách tài khoản</Nav.Link>
            {/* Có thể thêm link khác nếu cần */}
          </Nav>

          <Nav className='ms-auto align-items-center'>
            <span className='text-light me-3'>
              Xin chào,{' '}
              <strong>{currentUser.username || currentUser.email}</strong>
              {currentUser.role && (
                <span className='badge bg-secondary ms-2'>
                  {currentUser.role.toUpperCase()}
                </span>
              )}
            </span>

            <Button variant='outline-light' size='sm' onClick={handleLogout}>
              Đăng xuất
            </Button>
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  )
}

export default Navbar
