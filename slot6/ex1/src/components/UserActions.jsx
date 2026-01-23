// src/components/UserActions.jsx
import { Button } from 'react-bootstrap'

const UserActions = ({ user, onLockToggle }) => {
  return (
    <div className='d-flex gap-2 justify-content-center'>
      <Button variant='outline-primary' size='sm'>
        Edit
      </Button>

      <Button
        variant={
          user.status === 'Active' ? 'outline-danger' : 'outline-success'
        }
        size='sm'
        onClick={() => onLockToggle(user.id)}
      >
        {user.status === 'Active' ? 'Lock' : 'Unlock'}
      </Button>
    </div>
  )
}

export default UserActions
