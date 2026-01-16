import MenuItem from './MenuItem'
import { Col, Container, Row } from 'react-bootstrap'

export default function Menu({ items }) {
  return (
    <div className='menu' style={{ position: 'relative' }}>
      <h1 className='title'>Our Menu</h1>
      <Container>
        <Row>
          {items.map((item, index) => (
            <Col
              key={index}
              xs={6}
              md={3}
              className='d-flex justify-content-center mb-4'
            >
              <MenuItem
                name={item.name}
                price={item.price}
                tag={item.tag}
                src={item.src}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}
