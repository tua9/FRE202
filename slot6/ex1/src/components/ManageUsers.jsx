// src/components/ManageUsers.jsx
import { useState } from 'react'
import { Container, Card } from 'react-bootstrap'
import UserTable from './UserTable'
import { users } from '../data/ListOfUsers'

const ManageUsers = () => {
  const [userList, setUserList] = useState(users)

  const handleLockToggle = (id) => {
    setUserList((prev) =>
      prev.map((user) =>
        user.id === id
          ? { ...user, status: user.status === 'Active' ? 'Locked' : 'Active' }
          : user,
      ),
    )
  }

  return (
    <Container className='mt-5'>
      <Card className='shadow border-0'>
        <Card.Header className='bg-primary text-white'>
          <h4 className='mb-0'>Quản lý người dùng</h4>
        </Card.Header>

        <Card.Body className='p-0'>
          <UserTable users={userList} onLockToggle={handleLockToggle} />
        </Card.Body>
      </Card>
    </Container>
  )
}

export default ManageUsers
