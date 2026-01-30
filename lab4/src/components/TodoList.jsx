import { useReducer, useState } from 'react'
import {
  Card,
  ListGroup,
  Button,
  InputGroup,
  Form,
  Badge,
  Row,
  Col,
} from 'react-bootstrap'

const initialState = []

function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      if (!action.text.trim()) return state
      return [...state, { id: Date.now(), text: action.text.trim() }]
    case 'DELETE':
      return state.filter((task) => task.id !== action.id)
    default:
      return state
  }
}

export default function TodoList() {
  const [tasks, dispatch] = useReducer(reducer, initialState)
  const [input, setInput] = useState('')

  const addTask = () => {
    dispatch({ type: 'ADD', text: input })
    setInput('')
  }

  return (
    <Row className='justify-content-center'>
      <Col md={8} lg={6}>
        <Card border='warning' className='shadow'>
          <Card.Header className='bg-warning text-dark text-center'>
            <h4 className='mb-0'>Todo List - Quản lý công việc</h4>
          </Card.Header>
          <Card.Body>
            <InputGroup className='mb-4' size='lg'>
              <Form.Control
                placeholder='Nhập công việc mới...'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addTask()}
              />
              <Button variant='success' onClick={addTask}>
                Thêm
              </Button>
            </InputGroup>

            {tasks.length === 0 ? (
              <p className='text-center text-muted fst-italic'>
                Chưa có công việc nào...
              </p>
            ) : (
              <ListGroup variant='flush'>
                {tasks.map((task) => (
                  <ListGroup.Item
                    key={task.id}
                    className='d-flex justify-content-between align-items-center py-3'
                  >
                    <span>{task.text}</span>
                    <Button
                      variant='outline-danger'
                      size='sm'
                      onClick={() => dispatch({ type: 'DELETE', id: task.id })}
                    >
                      Xóa
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}

            {tasks.length > 0 && (
              <div className='mt-4 text-center'>
                <Badge bg='info' pill className='fs-6 px-4 py-2'>
                  Tổng: {tasks.length} công việc
                </Badge>
              </div>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}
