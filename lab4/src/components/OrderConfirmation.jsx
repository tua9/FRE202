import { useReducer, useEffect } from 'react'
import { Card, Button, Modal, Alert, Row, Col } from 'react-bootstrap'

const initialState = {
  isShowModal: false,
  isConfirmed: false,
}

function reducer(state, action) {
  switch (action.type) {
    case 'OPEN_MODAL':
      return { ...state, isShowModal: true }
    case 'CLOSE_MODAL':
      return { ...state, isShowModal: false }
    case 'CONFIRM_ORDER':
      return { isShowModal: false, isConfirmed: true }
    default:
      return state
  }
}

export default function OrderConfirmation() {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Tự động đóng modal sau khi confirm (đúng yêu cầu "kích hoạt đóng Modal tự động")
  useEffect(() => {
    if (state.isConfirmed) {
      const timer = setTimeout(() => {
        dispatch({ type: 'CLOSE_MODAL' }) // dù đã false nhưng để chắc chắn
      }, 2000) // đóng sau 2 giây (có thể điều chỉnh)
      return () => clearTimeout(timer)
    }
  }, [state.isConfirmed])

  return (
    <Row className='justify-content-center'>
      <Col md={7} lg={6}>
        <Card border='info' className='shadow'>
          <Card.Header className='bg-info text-white text-center'>
            <h4 className='mb-0'>Xác nhận đơn hàng</h4>
          </Card.Header>
          <Card.Body className='text-center py-5'>
            {state.isConfirmed ? (
              <Alert
                variant='success'
                className='mx-auto'
                style={{ maxWidth: '500px' }}
              >
                <h3>Đơn hàng đã xác nhận thành công!</h3>
                <p>Cảm ơn quý khách. Modal sẽ tự đóng.</p>
              </Alert>
            ) : (
              <>
                <p className='lead mb-4'>Bạn có muốn xác nhận đơn hàng này?</p>
                <Button
                  variant='primary'
                  size='lg'
                  onClick={() => dispatch({ type: 'OPEN_MODAL' })}
                >
                  Xác nhận đơn hàng
                </Button>
              </>
            )}

            <Modal
              show={state.isShowModal}
              onHide={() => dispatch({ type: 'CLOSE_MODAL' })}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Xác nhận đơn hàng</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p className='lead'>Bạn chắc chắn muốn xác nhận?</p>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant='secondary'
                  onClick={() => dispatch({ type: 'CLOSE_MODAL' })}
                >
                  Hủy
                </Button>
                <Button
                  variant='primary'
                  onClick={() => dispatch({ type: 'CONFIRM_ORDER' })}
                >
                  Xác nhận
                </Button>
              </Modal.Footer>
            </Modal>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}
