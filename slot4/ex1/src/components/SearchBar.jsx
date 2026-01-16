import { Search } from 'react-bootstrap-icons'

function SearchBar() {
  return (
    <div className='input-group'>
      <input type='text' className='form-control' placeholder='Search...' />
      <span className='input-group-append'>
        <button
          style={{
            border: 'none',
            outline: 'none',
            background: '#d73940',
            color: 'white',
            height: '100%',
          }}
          // Add 'd-flex' and 'justify-content-center' utility classes
          className='btn btn-outline-secondary align-items-center d-flex justify-content-center'
          type='button'
        >
          <Search /> {/* Use the Search component */}
        </button>
      </span>
    </div>
  )
}

export default SearchBar
