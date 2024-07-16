import PropTypes from 'prop-types'

/**
 * Feature component to display a feature with an icon, title, and description.
 * 
 * @param {Object} props - The component props.
 * @param {string} props.icon - The source URL of the feature icon.
 * @param {string} props.title - The title of the feature.
 * @param {string} props.description - The description of the feature.
 * @returns {JSX.Element} The rendered feature component.
 */
function Feature({ icon, title, description }) {
  return (
    <div className="feature-item">
      <img src={icon} alt={`${title} Icon`} className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{description}</p>
    </div>
  )
}

// Define prop types for the Feature component
Feature.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

export default Feature