import { useState, useEffect } from 'react'
import { Container, Form, Button, Card, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAccount } from '../contexts/AccountContext'
import accountService from '../services/accountService'
import MessageModal from '../components/MessageModal'

function LoginPage() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [loggedUser, setLoggedUser] = useState(null)

  const { state, dispatch } = useAccount()
  const navigate = useNavigate()

  useEffect(() => {
    accountService.getAll().then((res) => {
      dispatch({ type: 'SET_ACCOUNTS', payload: res.data })
    })
  }, [dispatch])

  const handleLogin = (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!usernameOrEmail.trim()) {
      newErrors.usernameOrEmail = 'Username or Email is required.'
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required.'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})

    const account = state.accounts.find(
      (acc) =>
        (acc.username === usernameOrEmail || acc.email === usernameOrEmail) &&
        acc.password === password,
    )

    if (!account) {
      alert('Invalid username/email or password!')
      return
    }

    if (account.role !== 'admin') {
      alert('Access denied. Only admin users can log in.')
      return
    }

    if (account.status === 'locked') {
      alert('Account is locked. Please contact admin.')
      return
    }

    setLoggedUser(account)
    setModalMessage(`Welcome, ${account.username}! Login successful.`)
    setShowModal(true)
  }

  const handleContinue = () => {
    dispatch({ type: 'LOGIN', payload: loggedUser })
    setShowModal(false)
    navigate('/accounts')
  }

  return (
    <Container
      className='d-flex justify-content-center align-items-center'
      style={{ minHeight: '100vh' }}
    >
      <Card style={{ width: '450px' }} className='shadow'>
        <Card.Body>
          <h2 className='text-center mb-4'>Login</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group className='mb-3'>
              <Form.Label>Username or Email</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter username or email'
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                isInvalid={!!errors.usernameOrEmail}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.usernameOrEmail}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <div className='d-flex gap-2 mb-3'>
              <Button variant='primary' type='submit' className='w-50'>
                Login
              </Button>
              <Button
                variant='secondary'
                type='button'
                className='w-50'
                onClick={() => {
                  setUsernameOrEmail('')
                  setPassword('')
                  setErrors({})
                }}
              >
                Cancel
              </Button>
            </div>
          </Form>
          <div className='text-center'>
            <p className='mb-0'>
              Don't have an account?{' '}
              <span
                style={{
                  color: 'blue',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
                onClick={() => navigate('/register')}
              >
                Sign up.
              </span>
            </p>
          </div>
        </Card.Body>
      </Card>

      <MessageModal
        show={showModal}
        onHide={() => setShowModal(false)}
        title='Login Success'
        message={modalMessage}
        onContinue={handleContinue}
      />
    </Container>
  )
}

export default LoginPage
