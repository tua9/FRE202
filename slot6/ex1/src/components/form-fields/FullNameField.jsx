// src/components/form-fields/FullNameField.jsx

import { useId } from 'react'
import {
  Form, // ← Import Form ở đây
  FormGroup,
  FormLabel,
  InputGroup,
  FormControl,
} from 'react-bootstrap'
import { LockFill } from 'react-bootstrap-icons'
import PropTypes from 'prop-types'

const FullNameField = ({ value, onChange, error }) => {
  const id = useId()

  return (
    <FormGroup className='mb-3' controlId={id}>
      <FormLabel>Họ tên</FormLabel>
      <InputGroup>
        <InputGroup.Text>
          <LockFill />
        </InputGroup.Text>
        <FormControl
          type='text'
          name='fullName'
          placeholder='Họ tên'
          value={value}
          onChange={onChange}
          isInvalid={!!error}
        />
      </InputGroup>

      {/* Sử dụng Form.Control.Feedback thay vì FormControlFeedback */}
      <Form.Control.Feedback type='invalid'>
        {error || 'Phải nhập 5 ký tự trở lên...'}
      </Form.Control.Feedback>
    </FormGroup>
  )
}

FullNameField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
}

export default FullNameField
