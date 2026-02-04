import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import { slideImages } from '../data/slideImages'

export default function SlideBar() {
  return (
    <div className='mx-auto' style={{ maxWidth: '1000px' }}>
      {' '}
      {/* ← Giới hạn width tối đa */}
      <Carousel
        interval={4500}
        indicators
        controls
        pause='hover'
        className='shadow-lg rounded overflow-hidden'
      >
        {slideImages.map((slide, index) => (
          <Carousel.Item key={index}>
            <img
              className='d-block w-100'
              src={slide.image}
              alt={slide.title}
              style={{
                height: '400px', // Giảm height cho gọn (tùy chỉnh nếu cần)
                objectFit: 'cover',
              }}
            />
            <Carousel.Caption className='bg-dark bg-opacity-65 py-4 rounded'>
              <h3 className='fw-bold mb-2'>{slide.title}</h3>
              <p className='mb-0'>{slide.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  )
}
