// src/components/LoginForm.jsx
import { useState } from 'react'
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  Card,
  Container,
  Row,
  Col,
  Alert,
} from 'react-bootstrap'

const LoginForm = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    if (!username || !password) {
      setError('Vui lòng nhập đầy đủ thông tin')
      return
    }
    // Giả lập đăng nhập thành công
    onLoginSuccess()
  }

  const handleCancel = () => {
    setUsername('')
    setPassword('')
    setError('')
  }

  return (
    <Container
      className='d-flex justify-content-center align-items-center'
      style={{ minHeight: '100vh' }}
    >
      <Card style={{ width: '420px' }} className='shadow-lg border-0'>
        <Card.Body className='p-5'>
          <h3 className='text-center mb-4 fw-bold'>Đăng nhập hệ thống</h3>

          {error && (
            <Alert variant='danger' dismissible onClose={() => setError('')}>
              {error}
            </Alert>
          )}

          <Form onSubmit={handleLogin}>
            <FormGroup as={Row} className='mb-3 align-items-center'>
              <FormLabel column sm={4} className='text-sm-end fw-semibold'>
                Tên đăng nhập
              </FormLabel>
              <Col sm={8}>
                <FormControl
                  type='text'
                  placeholder='Nhập username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoFocus
                />
              </Col>
            </FormGroup>

            <FormGroup as={Row} className='mb-4 align-items-center'>
              <FormLabel column sm={4} className='text-sm-end fw-semibold'>
                Mật khẩu
              </FormLabel>
              <Col sm={8}>
                <FormControl
                  type='password'
                  placeholder='Nhập mật khẩu'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Col>
            </FormGroup>

            <div className='d-flex gap-3 justify-content-end'>
              <Button variant='outline-secondary' onClick={handleCancel}>
                Hủy
              </Button>
              <Button variant='primary' type='submit'>
                Đăng nhập
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default LoginForm
