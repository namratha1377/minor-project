// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import AddItem from './pages/AddItem'
import CreateOutfit from './pages/CreateOutfit'
import MyOutfits from './pages/MyOutfits'

function App() {
  // Check if user is logged in (stored in localStorage for now)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user is logged in on app load
    const authStatus = localStorage.getItem('isAuthenticated')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  // Function to handle login
  const handleLogin = () => {
    setIsAuthenticated(true)
    localStorage.setItem('isAuthenticated', 'true')
  }

  // Function to handle logout
  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('isAuthenticated')
  }

  return (
    <Router>
      <Routes>
        {/* LOGIN */}
        <Route 
          path="/login" 
          element={
            isAuthenticated ? (
              <Navigate to="/home" replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          } 
        />

        {/* REGISTER */}
        <Route 
          path="/register" 
          element={
            isAuthenticated ? (
              <Navigate to="/home" replace />
            ) : (
              <Register onLogin={handleLogin} />
            )
          } 
        />

        {/* HOME */}
        <Route 
          path="/home" 
          element={
            isAuthenticated ? (
              <Home onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />

        {/* ADD ITEM (UPLOAD CLOTHES) */}
        <Route
          path="/add"
          element={
            isAuthenticated ? (
              <AddItem />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* CREATE OUTFIT PAGE */}
        <Route
          path="/create"
          element={
            isAuthenticated ? (
              <CreateOutfit />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* MY OUTFITS PAGE */}
        <Route
          path="/my-outfits"
          element={
            isAuthenticated ? (
              <MyOutfits />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* DEFAULT REDIRECT */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  )
}

export default App
