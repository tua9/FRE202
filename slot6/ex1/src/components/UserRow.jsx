// src/components/UserRow.jsx
import { Image, Badge } from 'react-bootstrap' // ← Xóa 'td' đi
import UserActions from './UserActions'

const UserRow = ({ user, onLockToggle }) => {
  return (
    <tr>
      <td className='text-center align-middle'>{user.id}</td>{' '}
      {/* ← Dùng <td> thuần HTML */}
      <td className='align-middle'>
        <Image
          src={user.avatar}
          roundedCircle
          width={48}
          height={48}
          alt={user.username}
        />
      </td>
      <td className='align-middle'>{user.username}</td>
      <td className='align-middle'>
        <Badge bg={user.status === 'Active' ? 'success' : 'danger'} pill>
          {user.status}
        </Badge>
      </td>
      <td className='align-middle text-muted'>
        {user.password.replace(/./g, '•')} {/* ẩn password */}
      </td>
      <td className='text-center align-middle'>
        <UserActions user={user} onLockToggle={onLockToggle} />
      </td>
    </tr>
  )
}

export default UserRow
