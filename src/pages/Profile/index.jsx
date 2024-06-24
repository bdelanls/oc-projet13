import { useSelector } from 'react-redux'
import AccountCard from '../../components/AccountCard'
import accountsData from '../../data/accountsData'

function ProfilePage() {
    const user = useSelector((state) => state.auth.user)

    return (
        <>
        <div className="header">
        <h1>Welcome back<br />{user ? `${user.firstName} ${user.lastName}` : 'User'}!</h1>
        <button className="edit-button">Edit Name</button>
      </div>
      <h2 className="sr-only">Accounts</h2>
      {accountsData.map(account => (
        <AccountCard
          key={account.id}
          title={account.title}
          amount={account.amount}
          description={account.description}
        />
      ))}
        </>
    )
}

export default ProfilePage