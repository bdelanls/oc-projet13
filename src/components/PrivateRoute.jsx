import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ element }) => {
  const isAuthenticated = useSelector((state) => state.auth.token)
  return isAuthenticated ? element : <Navigate to="/" />
}

export default PrivateRoute
