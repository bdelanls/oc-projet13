import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import './Header.scss'
import Logo from '../assets/img/argentBankLogo.png'
import { openModal } from '../features/modal/modalSlice'

function Header() {
  const dispatch = useDispatch()

  const handleSignInClick = (e) => {
    e.preventDefault()
    dispatch(openModal())
  }

  return (
    <header className="main-header">
      <nav className="main-nav">
        <Link to="/" className="main-nav-logo">
          <img
            className="main-nav-logo-image"
            src={Logo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          <Link to="/login" className="main-nav-item" onClick={handleSignInClick}>
            <i className="fa fa-user-circle"></i> Sign In
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header

