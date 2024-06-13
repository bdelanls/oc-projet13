import PropTypes from 'prop-types'
import './Modal.scss'

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

Modal.propTypes = {
  isOpen:
  PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}

export default Modal
