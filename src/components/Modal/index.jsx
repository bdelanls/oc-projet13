import PropTypes from 'prop-types'
import './Modal.scss'

/**
 * Modal component for user authentication.
 * 
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpen - Determines if the modal is open.
 * @param {Function} props.onClose - Function to call when the modal is closed.
 * @param {React.ReactNode} props.children - The content of the modal.
 * @returns {JSX.Element|null} The rendered modal component or null if not open.
 */
function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <section className="sign-in-content">
        <button className="modal-close" onClick={onClose}>X</button>
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        {children}
      </section>
    </div>
  )
}

// Define prop types for the Modal component
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}

export default Modal
