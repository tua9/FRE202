import { useReducer, useState, useRef, useEffect } from 'react'
import { Card, Button, Form, Row, Col } from 'react-bootstrap'

const initialState = { count: 0 }

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 }
    case 'DECREMENT':
      return { count: Math.max(0, state.count - 1) }
    case 'SET_INPUT':
      const num = Number(action.value)
      return { count: isNaN(num) ? 0 : Math.max(0, num) }
    default:
      return state
  }
}

export default function QuantityEditor() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(state.count.toString())
  const inputRef = useRef(null)

  // Đồng bộ editValue khi count thay đổi từ nút +/-
  useEffect(() => {
    setEditValue(state.count.toString())
  }, [state.count])

  // Focus input khi bắt đầu edit
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const handleEditStart = () => {
    setIsEditing(true)
  }

  const handleEditSave = () => {
    dispatch({ type: 'SET_INPUT', value: editValue })
    setIsEditing(false)
  }

  const handleEditCancel = () => {
    setEditValue(state.count.toString())
    setIsEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleEditSave()
    if (e.key === 'Escape') handleEditCancel()
  }

  return (
    <Row className='justify-content-center'>
      <Col md={6} lg={5} xl={4}>
        <Card border='primary' className='shadow'>
          <Card.Header className='bg-primary text-white text-center'>
            <h4 className='mb-0'>Chỉnh sửa số lượng sản phẩm</h4>
          </Card.Header>
          <Card.Body className='text-center py-5'>
            <div
              onClick={handleEditStart}
              role='button'
              tabIndex={0}
              style={{ cursor: 'pointer' }}
              className='mb-4'
            >
              {isEditing ? (
                <Form.Control
                  ref={inputRef}
                  type='number'
                  min='0'
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={handleEditSave}
                  onKeyDown={handleKeyDown}
                  className='d-inline-block text-center'
                  style={{ width: '120px', fontSize: '2.5rem' }}
                />
              ) : (
                <h1 className='display-3 fw-bold text-primary'>
                  {state.count}
                </h1>
              )}
            </div>

            <p className='text-muted mb-4'>
              (Click vào số để chỉnh sửa trực tiếp)
            </p>

            <div className='d-flex justify-content-center gap-4'>
              <Button
                variant='success'
                size='lg'
                onClick={() => dispatch({ type: 'INCREMENT' })}
              >
                + Tăng
              </Button>
              <Button
                variant='danger'
                size='lg'
                onClick={() => dispatch({ type: 'DECREMENT' })}
                disabled={state.count === 0}
              >
                - Giảm
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}
