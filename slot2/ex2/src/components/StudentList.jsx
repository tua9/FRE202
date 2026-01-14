import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import About from './About'
import { listOfStudent } from '../listOfStudent'

export default function StudentList() {
  return (
    <Container>
      <Row className='mt-3 g-3'>
        {listOfStudent.map((student) => (
          <Col key={student.id} md={3} xs={12} sm={6}>
            <About student={student} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}
