import { useState, useEffect, useMemo } from 'react'
import { Container, Table, Button, Badge, Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAccount } from '../contexts/AccountContext'
import accountService from '../services/accountService'
import FilterBar from '../components/FilterBar'
import ConfirmModal from '../components/ConfirmModal'
import ToastMessage from '../components/ToastMessage'

function AccountListPage() {
  const { state, dispatch } = useAccount()
  const navigate = useNavigate()

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [roleFilter, setRoleFilter] = useState('All')
  const [sortBy, setSortBy] = useState('')

  const [showConfirm, setShowConfirm] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState(null)

  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastVariant, setToastVariant] = useState('success')

  useEffect(() => {
    dispatch({ type: 'SET_LOADING' })
    accountService.getAll().then((res) => {
      dispatch({ type: 'SET_ACCOUNTS', payload: res.data })
    })
  }, [dispatch])

  const filteredAccounts = useMemo(() => {
    let result = [...state.accounts]

    // Search
    if (searchTerm) {
      const lower = searchTerm.toLowerCase()
      result = result.filter(
        (acc) =>
          acc.username.toLowerCase().includes(lower) ||
          acc.email.toLowerCase().includes(lower),
      )
    }

    // Filter by status
    if (statusFilter !== 'All') {
      result = result.filter((acc) => acc.status === statusFilter)
    }

    // Filter by role
    if (roleFilter !== 'All') {
      result = result.filter((acc) => acc.role === roleFilter)
    }

    // Sorting
    if (sortBy) {
      result.sort((a, b) => {
        switch (sortBy) {
          case 'username-asc':
            return a.username.localeCompare(b.username)
          case 'username-desc':
            return b.username.localeCompare(a.username)
          case 'role-admin':
            return a.role === 'admin' ? -1 : 1
          case 'role-user':
            return a.role === 'user' ? -1 : 1
          case 'status-active':
            return a.status === 'active' ? -1 : 1
          case 'status-locked':
            return a.status === 'locked' ? -1 : 1
          default:
            return 0
        }
      })
    }

    return result
  }, [state.accounts, searchTerm, statusFilter, roleFilter, sortBy])

  const handleLockUnlock = (account) => {
    // Do not self-lock the currently logged-user admin
    if (state.currentUser && state.currentUser.id === account.id) {
      setToastMessage('Cannot self-lock the currently logged-user admin.')
      setToastVariant('warning')
      setShowToast(true)
      return
    }
    setSelectedAccount(account)
    setShowConfirm(true)
  }

  const confirmLockUnlock = async () => {
    if (!selectedAccount) return

    const newStatus = selectedAccount.status === 'active' ? 'locked' : 'active'
    const updatedAccount = { ...selectedAccount, status: newStatus }

    try {
      await accountService.update(selectedAccount.id, updatedAccount)
      dispatch({ type: 'UPDATE_ACCOUNT', payload: updatedAccount })
      setShowConfirm(false)
      setToastMessage(
        newStatus === 'locked'
          ? 'Locked successfully'
          : 'Unlocked successfully',
      )
      setToastVariant('success')
      setShowToast(true)
    } catch (error) {
      console.error('Error updating account:', error)
    }
  }

  const getConfirmMessage = () => {
    if (!selectedAccount) return ''
    if (selectedAccount.status === 'active') {
      return `Lock account ${selectedAccount.username}? The user cannot log in after this`
    }
    return `Unlock account ${selectedAccount.username}?`
  }

  return (
    <Container className='mt-4'>
      <h2 className='mb-3'>Account Management</h2>

      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        roleFilter={roleFilter}
        onRoleChange={setRoleFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAccounts.map((account) => (
            <tr key={account.id}>
              <td>
                <Image
                  src={account.avatar}
                  roundedCircle
                  width={40}
                  height={40}
                  alt={account.username}
                />
              </td>
              <td>{account.username}</td>
              <td>{account.email}</td>
              <td>
                <Badge bg={account.role === 'admin' ? 'primary' : 'secondary'}>
                  {account.role}
                </Badge>
              </td>
              <td>
                <Badge bg={account.status === 'active' ? 'success' : 'danger'}>
                  {account.status}
                </Badge>
              </td>
              <td>
                <Button
                  variant='info'
                  size='sm'
                  className='me-2'
                  onClick={() => navigate(`/accounts/${account.id}`)}
                >
                  View Details
                </Button>
                <Button
                  variant={account.status === 'active' ? 'warning' : 'success'}
                  size='sm'
                  onClick={() => handleLockUnlock(account)}
                >
                  {account.status === 'active' ? 'Lock' : 'Unlock'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ConfirmModal
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
        title={
          selectedAccount?.status === 'active'
            ? 'Lock Account'
            : 'Unlock Account'
        }
        message={getConfirmMessage()}
        onConfirm={confirmLockUnlock}
      />

      <ToastMessage
        show={showToast}
        onClose={() => setShowToast(false)}
        message={toastMessage}
        variant={toastVariant}
      />
    </Container>
  )
}

export default AccountListPage
