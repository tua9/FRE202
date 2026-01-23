// src/components/UserTable.jsx
import { Table } from 'react-bootstrap'
import UserRow from './UserRow'

const UserTable = ({ users, onLockToggle }) => {
  return (
    <Table hover responsive className='mb-0'>
      <thead className='table-dark'>
        <tr>
          <th className='text-center'>ID</th>
          <th>Avatar</th>
          <th>Username</th>
          <th>Status</th>
          <th>Password</th>
          <th className='text-center'>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <UserRow key={user.id} user={user} onLockToggle={onLockToggle} />
        ))}
      </tbody>
    </Table>
  )
}

export default UserTable
