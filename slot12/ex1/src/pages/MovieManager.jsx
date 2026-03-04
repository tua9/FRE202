import React, { useState, useMemo } from 'react'
import { Container } from 'react-bootstrap'
import { MovieProvider, useMovieState } from '../contexts/MovieContext'
import MovieForm from '../components/MovieForm'
import MovieTable from '../components/MovieTable'
import FilterBar from '../components/FilterBar'
import Header from '../components/Header'

// Component con hiển thị nội dung, được bọc bởi Provider
const MovieManagerContent = () => {
  const { movies, genres } = useMovieState()

  // State cho bộ lọc và sắp xếp
  const [searchTerm, setSearchTerm] = useState('')
  const [genreFilter, setGenreFilter] = useState('')
  const [durationSort, setDurationSort] = useState('')
  const [sortByTitle, setSortByTitle] = useState('')

  // Logic lọc và sắp xếp
  const filteredMovies = useMemo(() => {
    let result = [...movies]

    // 1. Tìm kiếm theo tên
    if (searchTerm) {
      result = result.filter((m) =>
        m.title.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // 2. Lọc theo thể loại
    if (genreFilter) {
      result = result.filter((m) => String(m.genreId) === String(genreFilter))
    }

    // 3. Sắp xếp theo tên tăng/giảm tự động
    if (sortByTitle === 'asc') {
      result.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sortByTitle === 'desc') {
      result.sort((a, b) => b.title.localeCompare(a.title))
    }

    // 4. Sắp xếp theo thời lượng (nếu chọn)
    if (durationSort === 'short') {
      result.sort((a, b) => a.duration - b.duration)
    } else if (durationSort === 'long') {
      result.sort((a, b) => b.duration - a.duration)
    }

    return result
  }, [movies, searchTerm, genreFilter, durationSort, sortByTitle])

  return (
    <>
      <Header />
      <Container className='pb-5'>
        <h1 className='text-center mb-4'>🎬 Quản lý Phim Hệ Thống</h1>

        <MovieForm />

        <h2 className='mt-4 mb-3'>Danh sách Phim</h2>

        <FilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          genreFilter={genreFilter}
          setGenreFilter={setGenreFilter}
          durationSort={durationSort}
          setDurationSort={setDurationSort}
          sortByTitle={sortByTitle}
          setSortByTitle={setSortByTitle}
          genres={genres}
        />

        <MovieTable movies={filteredMovies} />
      </Container>
    </>
  )
}

// Component chính cung cấp Context
const MovieManager = () => (
  <MovieProvider>
    <MovieManagerContent />
  </MovieProvider>
)

export default MovieManager
