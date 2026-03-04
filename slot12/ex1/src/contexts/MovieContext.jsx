// src/contexts/MovieContext.jsx
import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useCallback,
} from 'react'
import { movieReducer, initialMovieState } from '../reducers/movieReducers'
import movieApi from '../api/movieApi'

// Contexts
export const MovieStateContext = createContext(initialMovieState)
export const MovieDispatchContext = createContext(null)

// Custom Hooks
export const useMovieState = () => useContext(MovieStateContext)
export const useMovieDispatch = () => useContext(MovieDispatchContext)

// MovieProvider Component
export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, initialMovieState)

  // Hàm READ: Tải danh sách phim (Axios GET)
  const fetchMovies = useCallback(async () => {
    dispatch({ type: 'START_LOADING' })
    try {
      const response = await movieApi.get('/movies')
      dispatch({ type: 'SET_MOVIES', payload: response.data })
    } catch (error) {
      console.error('Lỗi khi tải danh sách phim:', error)
      dispatch({ type: 'SET_MOVIES', payload: [] })
    }
  }, [dispatch])

  // Hàm fetch danh sách thể loại (Axios GET)
  const fetchGenres = useCallback(async () => {
    try {
      const response = await movieApi.get('/genres')
      dispatch({ type: 'SET_GENRES', payload: response.data })
    } catch (error) {
      console.error('Lỗi khi tải danh sách thể loại:', error)
      dispatch({ type: 'SET_GENRES', payload: [] })
    }
  }, [dispatch])

  // Hàm DELETE: Xóa phim (Axios DELETE)
  const confirmDelete = useCallback(
    async (id) => {
      dispatch({ type: 'CLOSE_DELETE_MODAL' })
      dispatch({ type: 'START_LOADING' })
      try {
        await movieApi.delete(`/movies/${id}`)
        fetchMovies()
      } catch (error) {
        console.error('Lỗi khi xóa phim:', error)
        fetchMovies()
      }
    },
    [fetchMovies],
  )

  // Hàm CREATE/UPDATE: Xử lý POST và PUT (Axios POST/PUT)
  const handleCreateOrUpdate = useCallback(
    async (dataToSend, isEditing, isEditingId) => {
      dispatch({ type: 'START_LOADING' })
      try {
        if (isEditing) {
          // UPDATE (PATCH) — chỉ cập nhật các trường thay đổi
          const { id, ...bodyWithoutId } = dataToSend
          await movieApi.patch(`/movies/${isEditingId}`, bodyWithoutId)
        } else {
          // CREATE (POST)
          await movieApi.post('/movies', dataToSend)
        }
        dispatch({ type: 'RESET_FORM' })
        fetchMovies()
        return true
      } catch (error) {
        console.error('Lỗi thao tác CREATE/UPDATE:', error)
        fetchMovies()
        return false
      }
    },
    [fetchMovies],
  )

  // Tải dữ liệu khi component mount
  useEffect(() => {
    fetchMovies()
    fetchGenres()
  }, [fetchMovies, fetchGenres])

  // Giá trị cung cấp cho Dispatch Context
  const dispatchValue = {
    dispatch,
    fetchMovies,
    fetchGenres,
    confirmDelete,
    handleCreateOrUpdate,
  }

  return (
    <MovieStateContext.Provider value={state}>
      <MovieDispatchContext.Provider value={dispatchValue}>
        {children}
      </MovieDispatchContext.Provider>
    </MovieStateContext.Provider>
  )
}
