import SearchBar from './SearchBar'

export default function Navigation() {
  return (
    <div
      style={{ background: '#333333', color: 'white' }}
      className='container-fluid py-3'
    >
      <div className='d-flex align-items-center'>
        <h1 className='me-4 mb-0'>Pizza House</h1>

        <div className='d-flex gap-4'>
          <span className='nav-link'>Home</span>
          <span className='nav-link'>About Us</span>
          <span className='nav-link'>Contact</span>
        </div>

        <div className='ms-auto'>
          <SearchBar />
        </div>
      </div>
    </div>
  )
}
