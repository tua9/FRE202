import { Modal, Button } from 'react-bootstrap'

function MessageModal({ show, onHide, title, message, onContinue }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title || 'Notification'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        {onContinue ? (
          <Button variant='primary' onClick={onContinue}>
            Continue
          </Button>
        ) : (
          <Button variant='secondary' onClick={onHide}>
            Close
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default MessageModal
