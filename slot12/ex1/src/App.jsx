import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import MovieManager from './pages/MovieManager'
import LoginPage from './pages/LoginPage'
import { AuthProvider, useAuth } from './contexts/AuthContext'

// PrivateRoute component to protect the movie manager
const PrivateRoute = ({ children }) => {
  const { user } = useAuth()
  return user ? children : <Navigate to='/login' />
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className='App'>
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route
              path='/'
              element={
                <PrivateRoute>
                  <MovieManager />
                </PrivateRoute>
              }
            />
            {/* Redirect any other path to main page */}
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
