import Carousel from 'react-bootstrap/Carousel'

function Banner({ images }) {
  return (
    <Carousel pause='hover' style={{ height: '420px' }}>
      {images.map((image, index) => (
        <Carousel.Item key={index} interval={3000}>
          <img
            className='d-block w-100'
            src={image.src}
            style={{ height: '420px', objectFit: 'cover' }}
            alt='banner_1'
          ></img>
          <Carousel.Caption className='text-black'>
            <h3>Welcome to Our Restaurant</h3>
            <p>Experience the best dining with us.</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default Banner
