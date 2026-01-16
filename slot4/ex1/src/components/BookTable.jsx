import React from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'

export default function BookTable() {
  return (
    <Container>
      <Row className='justify-content-center my-5'>
        <h1>Book Your Table</h1>
      </Row>

      <Row className='g-3 mb-4'>
        <Col md={4}>
          <Form.Control placeholder='Enter Your Name' />
        </Col>
        <Col md={4}>
          <Form.Control type='email' placeholder='Enter Your Email' />
        </Col>
        <Col md={4}>
          <Form.Select>
            <option>Select a service</option>
            <option>Dine In</option>
            <option>Take Away</option>
            <option>Delivery</option>
          </Form.Select>
        </Col>
      </Row>

      <Row className='mb-4'>
        <Col>
          <Form.Control
            as='textarea'
            rows={4}
            placeholder='Enter your message'
          />
        </Col>
      </Row>

      <Row className='mb-5'>
        <Col className='text-center'>
          <button className='btn btn-dark px-4'>Send Message</button>
        </Col>
      </Row>
    </Container>
  )
}
