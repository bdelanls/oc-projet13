import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
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
  const location = useLocation()

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

  return (
    <>
      <Header />
      <main className={isDarkBackground ? 'main bg-dark' : 'main'}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/profile' element={<PrivateRoute element={<ProfilePage />} />} />
          {/* <Route path='*' element={<HomePage />} /> */}
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
