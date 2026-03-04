import { Toast, ToastContainer } from 'react-bootstrap'

function ToastMessage({ show, onClose, message, variant }) {
  return (
    <ToastContainer position='top-end' className='p-3'>
      <Toast
        show={show}
        onClose={onClose}
        delay={3000}
        autohide
        bg={variant || 'success'}
      >
        <Toast.Header>
          <strong className='me-auto'>Notification</strong>
        </Toast.Header>
        <Toast.Body className='text-white'>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  )
}

export default ToastMessage
