import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/Home'
import ProfilePage from './pages/Profile'
import Modal from './components/Modal'
import LoginForm from './components/LoginForm'
import PrivateRoute from './components/PrivateRoute'
import { closeModal } from './features/modal/modalSlice'
import { resetError } from './features/auth/authSlice'
import './styles/main.scss'

function App() {
  const isModalOpen = useSelector((state) => state.modal.isOpen)
  const isAuthenticated = useSelector((state) => state.auth.token)
  const dispatch = useDispatch()

  const closeModalHandler = () => {
    dispatch(closeModal())
    dispatch(resetError())
  }

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(closeModal())
    }
  }, [isAuthenticated, dispatch])

  return (
    <Router>
      <Header />
      <main className={isModalOpen ? 'main bg-dark' : 'main'}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/profile' element={<PrivateRoute element={<ProfilePage />} />} />
        </Routes>
        <Modal isOpen={isModalOpen} onClose={closeModalHandler}>
          <LoginForm />
        </Modal>
      </main>
      <Footer />
    </Router>
  )
}

export default App
