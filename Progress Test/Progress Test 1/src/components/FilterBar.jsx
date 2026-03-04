import { Row, Col, Form } from 'react-bootstrap'

function FilterBar({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  roleFilter,
  onRoleChange,
  sortBy,
  onSortChange,
}) {
  return (
    <Row className='mb-3 g-2'>
      <Col md={3}>
        <Form.Control
          type='text'
          placeholder='Search by username or email'
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </Col>
      <Col md={3}>
        <Form.Select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option value='All'>All Status</option>
          <option value='active'>Active</option>
          <option value='locked'>Locked</option>
        </Form.Select>
      </Col>
      <Col md={3}>
        <Form.Select
          value={roleFilter}
          onChange={(e) => onRoleChange(e.target.value)}
        >
          <option value='All'>All Roles</option>
          <option value='admin'>Admin</option>
          <option value='user'>User</option>
        </Form.Select>
      </Col>
      <Col md={3}>
        <Form.Select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value=''>Sort By</option>
          <option value='username-asc'>Username (A→Z)</option>
          <option value='username-desc'>Username (Z→A)</option>
          <option value='role-admin'>Role (Admin first)</option>
          <option value='role-user'>Role (User first)</option>
          <option value='status-active'>Status (Active first)</option>
          <option value='status-locked'>Status (Locked first)</option>
        </Form.Select>
      </Col>
    </Row>
  )
}

export default FilterBar
