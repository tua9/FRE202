import { useState } from 'react'
import { Container, Form, Button, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import accountService from '../services/accountService'
import ToastMessage from '../components/ToastMessage'

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const navigate = useNavigate()

  const validate = () => {
    const newErrors = {}
    if (!formData.username.trim()) newErrors.username = 'Username is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    if (!formData.password) newErrors.password = 'Password is required'
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      // Check if username or email already exists
      const { data: accounts } = await accountService.getAll()
      if (accounts.find((a) => a.username === formData.username)) {
        setErrors({ username: 'Username already exists' })
        return
      }
      if (accounts.find((a) => a.email === formData.email)) {
        setErrors({ email: 'Email already exists' })
        return
      }

      const newAccount = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: 'user', // Default role
        status: 'active', // Default status
        avatar: '/images/users/admin.png', // Default avatar or placeholder
      }

      await accountService.create(newAccount)
      setToastMessage('Account registered successfully!')
      setShowToast(true)
      setTimeout(() => {
        navigate('/')
      }, 2000)
    } catch (error) {
      console.error('Registration failed:', error)
      alert('Registration failed. Please try again.')
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <Container
      className='d-flex justify-content-center align-items-center'
      style={{ minHeight: '100vh' }}
    >
      <Card style={{ width: '450px' }} className='shadow'>
        <Card.Body>
          <h2 className='text-center mb-4'>Register</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='text'
                name='username'
                placeholder='Enter username'
                value={formData.username}
                onChange={handleChange}
                isInvalid={!!errors.username}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                name='email'
                placeholder='Enter email'
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                name='password'
                placeholder='Enter password'
                value={formData.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                name='confirmPassword'
                placeholder='Confirm password'
                value={formData.confirmPassword}
                onChange={handleChange}
                isInvalid={!!errors.confirmPassword}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.confirmPassword}
              </Form.Control.Feedback>
            </Form.Group>

            <div className='d-flex gap-2'>
              <Button variant='success' type='submit' className='w-50'>
                Register
              </Button>
              <Button
                variant='secondary'
                type='button'
                className='w-50'
                onClick={() => navigate('/')}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <ToastMessage
        show={showToast}
        onClose={() => setShowToast(false)}
        message={toastMessage}
        variant='success'
      />
    </Container>
  )
}

export default RegisterPage
