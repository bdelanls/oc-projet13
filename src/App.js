import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/Home'
import Modal from './components/Modal'
import LoginForm from './components/LoginForm'
import { closeModal } from './features/modal/modalSlice'
import './styles/main.scss'

function App() {
  const isModalOpen = useSelector((state) => state.modal.isOpen)
  const dispatch = useDispatch()

  const closeModalHandler = () => {
    dispatch(closeModal())
  }

  return (
    <Router>
      <Header />
      <main className='main'>
        <Routes>
          <Route path='/' element={<HomePage />} />
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
