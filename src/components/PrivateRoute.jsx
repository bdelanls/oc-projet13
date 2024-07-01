import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'

/**
 * Composant pour protéger les routes privées
 * @param {Object} props - Props du composant
 * @param {React.ComponentType} props.element - Composant à rendre si l'utilisateur est authentifié
 * @returns {JSX.Element} Composant à rendre ou redirection vers la page d'accueil
 */
const PrivateRoute = ({ component: Component }) => {
  const token = useSelector((state) => state.auth.token)

  return token ? <Component /> : <Navigate to="/" />
}


PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired
}


export default PrivateRoute
