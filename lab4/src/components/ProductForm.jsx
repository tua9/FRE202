import { useReducer, useMemo } from 'react'
import {
  Card,
  Form,
  Button,
  Row,
  Col,
  Alert,
  InputGroup,
} from 'react-bootstrap'

const initialState = {
  values: {
    name: '',
    price: '',
    category: '',
  },
  errors: {
    name: '',
    price: '',
    category: '',
  },
  submitted: false,
  successMessage: null, // Lưu thông tin sản phẩm vừa thêm để hiển thị text
}

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_INPUT': {
      const { field, value } = action.payload
      let newValue = value
      let error = ''

      if (field === 'price') {
        // Chỉ cho phép số nguyên không âm
        if (value === '' || /^\d+$/.test(value)) {
          newValue = value
        } else {
          newValue = state.values.price // Giữ nguyên nếu nhập sai
        }
        error = newValue === '' ? 'Vui lòng nhập giá sản phẩm' : ''
      } else if (field === 'name') {
        error = newValue.trim() === '' ? 'Vui lòng nhập tên sản phẩm' : ''
      } else if (field === 'category') {
        error = newValue === '' ? 'Vui lòng chọn danh mục' : ''
      }

      return {
        ...state,
        values: { ...state.values, [field]: newValue },
        errors: { ...state.errors, [field]: error },
        successMessage: null, // Xóa thông báo cũ khi chỉnh sửa
      }
    }

    case 'RESET_FORM':
      return initialState

    case 'SUBMIT': {
      const newErrors = {
        name:
          state.values.name.trim() === '' ? 'Vui lòng nhập tên sản phẩm' : '',
        price: state.values.price === '' ? 'Vui lòng nhập giá sản phẩm' : '',
        category: state.values.category === '' ? 'Vui lòng chọn danh mục' : '',
      }

      const hasError = Object.values(newErrors).some((err) => err !== '')

      if (hasError) {
        return {
          ...state,
          errors: newErrors,
          submitted: true,
          successMessage: null,
        }
      }

      // Thành công: tạo thông báo text chi tiết
      const successMessage =
        `Sản phẩm đã được thêm thành công!\n\n` +
        `Tên: ${state.values.name.trim()}\n` +
        `Giá: ${Number(state.values.price).toLocaleString('vi-VN')} VND\n` +
        `Danh mục: ${state.values.category}`

      return {
        ...initialState,
        successMessage,
      }
    }

    default:
      return state
  }
}

export default function ProductForm() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const isFormValid = useMemo(() => {
    return (
      state.values.name.trim() !== '' &&
      state.values.price !== '' &&
      state.values.category !== '' &&
      !Object.values(state.errors).some((err) => err !== '')
    )
  }, [state.values, state.errors])

  const handleChange = (e) => {
    const { name, value } = e.target
    dispatch({
      type: 'CHANGE_INPUT',
      payload: { field: name, value },
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch({ type: 'SUBMIT' })
  }

  return (
    <Row className='justify-content-center'>
      <Col md={8} lg={6}>
        <Card border='success' className='shadow-sm'>
          <Card.Header className='bg-success text-white text-center'>
            <h4 className='mb-0'>Thêm sản phẩm mới</h4>
          </Card.Header>

          <Card.Body>
            <Form noValidate onSubmit={handleSubmit}>
              {/* Tên sản phẩm */}
              <Form.Group className='mb-3' controlId='formName'>
                <Form.Label>
                  Tên sản phẩm <span className='text-danger'>*</span>
                </Form.Label>
                <Form.Control
                  type='text'
                  name='name'
                  value={state.values.name}
                  onChange={handleChange}
                  isInvalid={state.submitted && !!state.errors.name}
                  placeholder='Nhập tên sản phẩm'
                  required
                />
                <Form.Control.Feedback type='invalid'>
                  {state.errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Giá */}
              <Form.Group className='mb-3' controlId='formPrice'>
                <Form.Label>
                  Giá (VND) <span className='text-danger'>*</span>
                </Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text>VND</InputGroup.Text>
                  <Form.Control
                    type='text'
                    name='price'
                    value={state.values.price}
                    onChange={handleChange}
                    isInvalid={state.submitted && !!state.errors.price}
                    placeholder='Ví dụ: 15000000'
                    required
                  />
                  <Form.Control.Feedback type='invalid'>
                    {state.errors.price}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              {/* Danh mục */}
              <Form.Group className='mb-4' controlId='formCategory'>
                <Form.Label>
                  Danh mục <span className='text-danger'>*</span>
                </Form.Label>
                <Form.Select
                  name='category'
                  value={state.values.category}
                  onChange={handleChange}
                  isInvalid={state.submitted && !!state.errors.category}
                  required
                >
                  <option value=''>Chọn danh mục</option>
                  <option value='Điện thoại'>Điện thoại</option>
                  <option value='Laptop'>Laptop</option>
                  <option value='Phụ kiện'>Phụ kiện</option>
                  <option value='Khác'>Khác</option>
                </Form.Select>
                <Form.Control.Feedback type='invalid'>
                  {state.errors.category}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Nút */}
              <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
                <Button
                  variant='primary'
                  type='submit'
                  disabled={state.submitted && !isFormValid}
                >
                  Thêm sản phẩm
                </Button>
                <Button
                  variant='outline-secondary'
                  type='button'
                  onClick={() => dispatch({ type: 'RESET_FORM' })}
                >
                  Reset form
                </Button>
              </div>
            </Form>

            {/* Thông báo thành công hiển thị bên dưới */}
            {state.successMessage && (
              <Alert variant='success' className='mt-4'>
                <Alert.Heading>Thêm thành công!</Alert.Heading>
                <pre
                  className='mb-0'
                  style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}
                >
                  {state.successMessage}
                </pre>
              </Alert>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}
