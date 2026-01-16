import { Card, Button, Badge } from 'react-bootstrap'

export default function MenuItem({ tag, src, name, price }) {
  return (
    <Card className='menu-card' style={{ width: '156px' }}>
      <div className='position-relative'>
        {tag && (
          <Badge
            style={{ position: 'absolute' }}
            bg='warning'
            className='menu-badge'
          >
            {tag}
          </Badge>
        )}
        <Card.Img
          style={{ objectFit: 'fill', height: '128px' }}
          variant='top'
          src={src}
          className='menu-image'
        />
      </div>

      <Card.Body className='text-center'>
        <Card.Title className='fs-6'>{name}</Card.Title>
        <Card.Text>{price}</Card.Text>
        <Button variant='dark' className='w-100'>
          Buy
        </Button>
      </Card.Body>
    </Card>
  )
}
