import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AccountCard from '../../components/AccountCard'
import accountsData from '../../data/accountsData'
import { updateProfile, fetchUserProfile } from '../../features/profile/profileSlice'
import './style.scss'


function ProfilePage() {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.profile.user)
    const token = useSelector((state) => state.auth.token)

    const [isEditing, setIsEditing] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    useEffect(() => {
        if (token) {
        dispatch(fetchUserProfile(token))
        }
    }, [dispatch, token])

    useEffect(() => {
        if (user) {
        setFirstName(user.firstName)
        setLastName(user.lastName)
        }
    }, [user])

    const handleEditClick = () => {
        setIsEditing(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateProfile({ firstName, lastName, token }))
        setIsEditing(false)
    }


    return (
        <>
        <div className="header">
        
        {isEditing ? (
            
            <form onSubmit={handleSubmit} className="edit-form">
                <h1>Welcome back<br />
                <div className="input-wrapper">
                <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    placeholder='FirstName'
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    placeholder='LastName'
                    onChange={(e) => setLastName(e.target.value)}
                />
                </div>
                </h1>
                <button type="submit" className="edit-button">Submit</button>
            </form>
        ) : (
            <>
                <h1>Welcome back<br />
                {user ? `${user.firstName} ${user.lastName}` : 'User'}!</h1>
                <button className="edit-button" onClick={handleEditClick}>Edit Name</button>
            </>
        )}
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