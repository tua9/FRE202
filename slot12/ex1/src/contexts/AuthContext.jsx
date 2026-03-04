import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null,
  )
  const [loading, setLoading] = useState(false)

  const login = async (username, password) => {
    setLoading(true)
    try {
      const response = await axios.get(
        `http://localhost:3001/accounts?username=${username}&password=${password}`,
      )
      if (response.data.length > 0) {
        const userData = response.data[0]
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
        return { success: true }
      } else {
        return { success: false, message: 'Sai tên đăng nhập hoặc mật khẩu' }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, message: 'Lỗi server' }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
