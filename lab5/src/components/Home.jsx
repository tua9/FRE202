// src/components/Home.jsx
import { Container, Card } from 'react-bootstrap'

export default function Home() {
  return (
    <Container className='py-5'>
      {/* Phần thông tin tác giả - thu nhỏ lại */}
      <Card
        className='mx-auto shadow-sm border-0'
        style={{ maxWidth: '700px' }}
      >
        <Card.Body className='p-4 text-center'>
          <Card.Title as='h4' className='mb-3 fw-bold'>
            1. Thông tin tác giả
          </Card.Title>

          <Card.Text className='mb-4' style={{ fontSize: '1.1rem' }}>
            <strong>Mã SV:</strong> DE170051 <br />
            <strong>Họ tên:</strong> Lê Anh Tuấn <br />
            <strong>GitHub:</strong>{' '}
            <a
              href='https://github.com/tua9/FER202'
              target='_blank'
              rel='noopener noreferrer'
              className='text-primary fw-bold'
            >
              https://github.com/tua9/FER202
            </a>
          </Card.Text>

          <hr className='my-4' />

          <Card.Title as='h4' className='mb-3 fw-bold'>
            2. Cấu trúc project
          </Card.Title>

          <Card.Text className='text-muted' style={{ fontSize: '1rem' }}>
            Project được tổ chức theo mô hình Component-based sử dụng React +
            React Router + React-Bootstrap.
            <br />
            Quản lý state form bằng <strong>useReducer</strong>.
            <br />
            Validation client-side cho các trường quan trọng.
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  )
}
