import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'

/**
 * Component to protect private routes.
 * @param {Object} props - Component props
 * @param {React.ComponentType} props.component - Component to render if the user is authenticated
 * @returns {JSX.Element} Component to render or redirection to the home page
 */
const PrivateRoute = ({ component: Component }) => {
  const token = useSelector((state) => state.auth.token)

  return token ? <Component /> : <Navigate to="/" />
}


PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired
}


export default PrivateRoute
