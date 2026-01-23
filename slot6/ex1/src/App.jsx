// src/App.jsx
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import LoginForm from './components/LoginForm'
import ManageUsers from './components/ManageUsers'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <>
      {!isLoggedIn ? (
        <LoginForm onLoginSuccess={() => setIsLoggedIn(true)} />
      ) : (
        <ManageUsers />
      )}
    </>
  )
}

export default App
