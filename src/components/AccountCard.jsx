import PropTypes from 'prop-types'

/**
 * AccountCard component to display account details.
 * 
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the account.
 * @param {string} props.amount - The amount in the account.
 * @param {string} props.description - The description of the account.
 * @returns {JSX.Element} The rendered account card component.
 */
function AccountCard({ title, amount, description }) {
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{title}</h3>
        <p className="account-amount">${amount}</p>
        <p className="account-amount-description">{description}</p>
      </div>
      <div className="account-content-wrapper cta">
        <button className="transaction-button">View transactions</button>
      </div>
    </section>
  )
}

// Define prop types for the AccountCard component
AccountCard.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

export default AccountCard
