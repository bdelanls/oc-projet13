import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { logout } from '../../features/auth/authSlice'
import { setUser } from '../../features/profile/profileSlice'
import './Header.scss'
import Logo from '../../assets/img/argentBankLogo.png'
import { openModal } from '../../features/modal/modalSlice'

/**
 * Header component with logo, navigation, and authentication functionality.
 * 
 * @returns {JSX.Element} The rendered header component.
 */
function Header() {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)
  const user = useSelector((state) => state.profile.user)

  useEffect(() => {
    if (token && !user) {
      // Fetch the user information from the API
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
        }
      }
      fetchUser()
    }
  }, [token, user, dispatch])

  /**
   * Handle user logout
   */
  const handleLogout = () => {
    dispatch(logout())
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
          {token ? (
            <>
              <Link to="/profile" className="main-nav-item">
                <i className="fa fa-user-circle"></i>
                {user ? user.firstName : 'User'}
              </Link>
              <a onClick={handleLogout} className="main-nav-item">
                <i className="fa fa-sign-out"></i>
                Sign Out
              </a>
            </>
          ) : (
            <Link to="#" className="main-nav-item" onClick={() => dispatch(openModal())}>
              <i className="fa fa-user-circle"></i>
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header

