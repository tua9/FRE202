import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default function Student({ student }) {
  return (
    <Card
      className='h-100 text-center shadow-sm'
      style={{
        width: '18rem',
        backgroundColor: 'rgba(212, 234, 249, 0.54)',
      }}
    >
      <Card.Img
        variant='top'
        src={student.avatar}
        style={{
          backgroundColor: '#6be1ff',
          width: '128px',
          height: '128px',
          objectFit: 'cover',
          borderRadius: '50%',
          margin: '16px auto 0',
        }}
      />
      <Card.Body className='d-flex flex-column'>
        <Card.Title>{student.name}</Card.Title>
        <p className='mb-1'>Grade: {student.grade}</p>
        <p className='mb-3'>Age: {student.age}</p>
        <Button variant='primary' className='mt-auto'>
          Details
        </Button>
      </Card.Body>
    </Card>
  )
}
