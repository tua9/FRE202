import { useState } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import FullNameField from './form-fields/FullNameField'
import AddressField from './form-fields/AddressField'
import AirportSelect from './form-fields/AirportSelect'
import TripTypeRadio from './form-fields/TripTypeRadio'

const FlightBookingForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    departure: 'Hà Nội (HAN)',
    arrival: 'Hà Nội (HAN)',
    tripType: 'roundTrip',
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value, type } = e.target
    const newValue = type === 'radio' ? value : value

    setFormData((prev) => ({ ...prev, [name]: newValue }))

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) newErrors.fullName = 'Vui lòng nhập họ tên'
    else if (formData.fullName.trim().length < 5)
      newErrors.fullName = 'Họ tên phải từ 5 ký tự trở lên'

    if (!formData.address.trim()) newErrors.address = 'Vui lòng nhập địa chỉ'
    else if (formData.address.trim().length < 5)
      newErrors.address = 'Địa chỉ phải từ 5 ký tự trở lên'

    if (formData.departure === formData.arrival)
      newErrors.arrival = 'Điểm đến không được trùng điểm đi'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      console.log('Dữ liệu đặt vé:', formData)
      alert('Đặt vé thành công! (Demo)')
    }
  }

  return (
    <Container className='mt-5' style={{ maxWidth: '600px' }}>
      <div className='border p-4 rounded shadow-sm bg-light'>
        <h3 className='text-center mb-4'>Form đặt vé máy bay</h3>

        <Form onSubmit={handleSubmit} noValidate>
          <FullNameField
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
          />

          <AddressField
            value={formData.address}
            onChange={handleChange}
            error={errors.address}
          />

          <Row className='mb-3'>
            <Col md={6}>
              <AirportSelect
                label='Đi từ'
                name='departure'
                value={formData.departure}
                onChange={handleChange}
                error={errors.departure}
                controlId='departure'
              />
            </Col>
            <Col md={6}>
              <AirportSelect
                label='Đến'
                name='arrival'
                value={formData.arrival}
                onChange={handleChange}
                error={errors.arrival}
                controlId='arrival'
              />
            </Col>
          </Row>

          <TripTypeRadio value={formData.tripType} onChange={handleChange} />

          <div className='d-grid'>
            <Button variant='primary' size='lg' type='submit'>
              Đặt vé
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  )
}

export default FlightBookingForm
