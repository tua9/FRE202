import studentData from '../data/studentData'
import Student from './Student'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function StudentList() {
  console.log(studentData)

  return (
    <Container className='mt-3'>
      <Row className='g-3'>
        {studentData.map((student) => (
          <Col
            key={student.id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            className='d-flex justify-content-center'
          >
            <Student student={student} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}
