import React, { useState, useEffect } from 'react'

const API_ENDPOINT = 'http://localhost:3001/movies'

const MovieList = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  // Hàm bất đồng bộ (async/await) để gọi API
  const fetchMovies = async () => {
    try {
      const response = await fetch(API_ENDPOINT) // Mặc định là GET

      // Kiểm tra lỗi HTTP (ví dụ: 404, 500)
      if (!response.ok) {
        throw new Error(`Lỗi HTTP: ${response.status}`)
      }
      const data = await response.json() // Chuyển đổi phản hồi sang JSON
      setMovies(data)
    } catch (error) {
      console.error('Lỗi khi tải danh sách phim:', error)
    } finally {
      setLoading(false) // Dù thành công hay thất bại cũng dừng loading
    }
  }

  const handleCreate = async (newMovieData) => {
    const url = 'http://localhost:3001/movies'
    try {
      const response = await fetch(url, {
        method: 'POST', // Phương thức POST
        headers: {
          'Content-Type': 'application/json', // Báo cho server biết dữ liệu là JSON
        },
        body: JSON.stringify(newMovieData), // Chuyển đổi đối tượng JS thành chuỗi JSON
      })
      if (!response.ok) {
        throw new Error('Thêm phim thất bại.')
      }
      const createdMovie = await response.json()
      console.log('Phim đã được tạo:', createdMovie)
      // Sau khi tạo thành công, gọi lại fetchMovies() để cập nhật danh sách
      fetchMovies()
    } catch (error) {
      console.error('Lỗi khi thêm phim:', error)
    }
  }

  //   handleCreate({
  //     title: 'New Sci-Fi',
  //     description: '...',
  //     genreId: 1,
  //     year: 2025,
  //     duration: 90,
  //   })

  const handleUpdate = async (id, updatedFields) => {
    const url = `http://localhost:3001/movies/${id}`
    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields),
      })
      if (!response.ok) {
        throw new Error(`Cập nhật phim ID ${id} thất bại.`)
      }
      console.log(`Phim ID ${id} đã được cập nhật.`)
      fetchMovies()
    } catch (error) {
      console.error('Lỗi khi cập nhật phim:', error)
    }
  }

  const handleDelete = async (id) => {
    const url = `http://localhost:3001/movies/${id}`
    try {
      const response = await fetch(url, { method: 'DELETE' })
      if (!response.ok) {
        throw new Error(`Xóa phim ID ${id} thất bại.`)
      }
      console.log(`Phim ID ${id} đã được xóa.`)
      setMovies(movies.filter((movie) => movie.id !== id))
    } catch (error) {
      console.error('Lỗi khi xóa phim:', error)
    }
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  if (loading) {
    return <div>Đang tải dữ liệu phim...</div>
  }

  return (
    <div>
      <h1>
        <button
          onClick={() => {
            handleCreate({
              title: 'New Sci-Fi',
              description: '...',
              genreId: 1,
              year: 2025,
              duration: 90,
            })
          }}
        >
          Thêm Phim
        </button>
      </h1>
      <h2>Danh sách Phim ({movies.length} phim)</h2>
      {movies.map((movie) => (
        <div key={movie.id}>
          <strong>{movie.title}</strong> ({movie.year}) - Thể loại ID:{' '}
          {movie.genreId}
        </div>
      ))}
    </div>
  )
}

export default MovieList
