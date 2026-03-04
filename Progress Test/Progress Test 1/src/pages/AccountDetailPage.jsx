import { useState, useEffect } from 'react'
import { Container, Card, Image, Badge, Button } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import accountService from '../services/accountService'

function AccountDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [account, setAccount] = useState(null)

  useEffect(() => {
    accountService.getById(id).then((res) => {
      setAccount(res.data)
    })
  }, [id])

  if (!account) {
    return (
      <Container className='mt-4 text-center'>
        <p>Loading...</p>
      </Container>
    )
  }

  return (
    <Container className='mt-4 d-flex justify-content-center'>
      <Card style={{ width: '500px' }} className='shadow'>
        <Card.Body className='text-center'>
          <Image
            src={account.avatar}
            roundedCircle
            width={120}
            height={120}
            className='mb-3'
            alt={account.username}
          />
          <h3>{account.username}</h3>
          <p className='text-muted'>{account.email}</p>
          <p>
            <strong>Role: </strong>
            <Badge bg={account.role === 'admin' ? 'primary' : 'secondary'}>
              {account.role}
            </Badge>
          </p>
          <p>
            <strong>Status: </strong>
            <Badge bg={account.status === 'active' ? 'success' : 'danger'}>
              {account.status}
            </Badge>
          </p>
          <Button
            variant='outline-primary'
            onClick={() => navigate('/accounts')}
          >
            Back to Lists
          </Button>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default AccountDetailPage
