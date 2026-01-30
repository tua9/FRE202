import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function NavbarMenu() {
  return (
    <Navbar bg='dark' variant='dark' expand='lg' className='mb-4'>
      <Container fluid>
        <Navbar.Brand as={Link} to='/'>
          Lab 4 - useReducer
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link as={Link} to='/ex1'>
              Ex1 - Số lượng
            </Nav.Link>
            <Nav.Link as={Link} to='/ex2'>
              Ex2 - Xác nhận đơn
            </Nav.Link>
            <Nav.Link as={Link} to='/ex3'>
              Ex3 - Form sản phẩm
            </Nav.Link>
            <Nav.Link as={Link} to='/ex4'>
              Ex4 - Todo List
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
