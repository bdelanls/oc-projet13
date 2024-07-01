import { useEffect, useState } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/Home'
import ProfilePage from './pages/Profile'
import Modal from './components/Modal'
import LoginForm from './components/LoginForm'
import PrivateRoute from './components/PrivateRoute'
import { closeModal } from './features/modal/modalSlice'
import { resetError, setToken, setUser } from './features/auth/authSlice'
import axios from 'axios'
import './styles/main.scss'

function App() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const isModalOpen = useSelector((state) => state.modal.isOpen)
  const isAuthenticated = useSelector((state) => state.auth.token)
  const location = useLocation()

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    if (token) {
      dispatch(setToken(token))
      const fetchUser = async () => {
        try {
          const response = await axios.post('http://localhost:3001/api/v1/user/profile', {}, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          })
          dispatch(setUser(response.data.body))
        } catch (error) {
          console.error('Failed to fetch user', error)
        } finally {
          setLoading(false)
        }
      }
      fetchUser()
    } else {
      setLoading(false)
    }
  }, [dispatch])

  const closeModalHandler = () => {
    dispatch(closeModal())
    dispatch(resetError())
  }

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(closeModal())
    }
  }, [isAuthenticated, dispatch])

  // Condition pour ajouter la classe bg-dark
  const isDarkBackground = location.pathname !== '/' || isModalOpen

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Header />
      <main className={isDarkBackground ? 'main bg-dark' : 'main'}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/profile' element={<PrivateRoute component={ProfilePage} />} />
          <Route path='*' element={<Navigate to="/" />} />
        </Routes>
        <Modal isOpen={isModalOpen} onClose={closeModalHandler}>
          <LoginForm />
        </Modal>
      </main>
      <Footer />
    </>
  )
}

export default App
