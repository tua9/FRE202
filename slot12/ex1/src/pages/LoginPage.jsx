import React, { useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login, loading } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const result = await login(username, password)
    if (result.success) {
      navigate('/')
    } else {
      setError(result.message)
    }
  }

  return (
    <div className='login-wrapper'>
      <Card className='login-card'>
        <div className='login-header'>
          <span className='login-logo'>🎬</span>
          <h2 className='login-title'>Hệ Thống Phim</h2>
          <p className='login-subtitle'>
            Chào mừng bạn trở lại! Vui lòng đăng nhập.
          </p>
        </div>

        <div className='login-body'>
          {error && (
            <Alert variant='danger' className='rounded-3'>
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='formUsername'>
              <Form.Label className='fw-bold small'>TÊN ĐĂNG NHẬP</Form.Label>
              <Form.Control
                type='text'
                placeholder='Nhập username của bạn'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className='shadow-sm border-0 bg-light'
              />
            </Form.Group>

            <Form.Group className='mb-4' controlId='formPassword'>
              <Form.Label className='fw-bold small'>MẬT KHẨU</Form.Label>
              <Form.Control
                type='password'
                placeholder='Nhập mật khẩu'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className='shadow-sm border-0 bg-light'
              />
            </Form.Group>

            <Button
              variant='primary'
              type='submit'
              className='w-100 login-btn-premium shadow'
              disabled={loading}
            >
              {loading ? 'Đang xác thực...' : 'Đăng nhập ngay'}
            </Button>
          </Form>

          <div className='mt-4 text-center'>
            <div className='p-2 bg-light rounded-3 border'>
              <small className='text-secondary fw-bold'>Tài khoản demo:</small>
              <br />
              <small className='text-muted'>admin / 123 | user1 / 123</small>
            </div>
          </div>
        </div>
      </Card>

      <div className='login-footer'>
        <small>© 2024 Movie Hub Premium. All rights reserved.</small>
      </div>
    </div>
  )
}

export default LoginPage
