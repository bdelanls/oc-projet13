import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AccountCard from '../../components/AccountCard'
import accountsData from '../../data/accountsData'
import { updateProfile, fetchUserProfile } from '../../features/profile/profileSlice'
import './style.scss'

/**
 * ProfilePage component
 * Displays the user's profile page, allowing for profile editing and displaying account information.
 * 
 * @returns {JSX.Element} The rendered profile page component
 */
function ProfilePage() {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.profile.user)
    const token = useSelector((state) => state.auth.token)

    const [isEditing, setIsEditing] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    // Fetch user profile when the component mounts or the token changes
    useEffect(() => {
        if (token) {
        dispatch(fetchUserProfile(token))
        }
    }, [dispatch, token])

    // Update local state when the user profile is fetched
    useEffect(() => {
        if (user) {
        setFirstName(user.firstName)
        setLastName(user.lastName)
        }
    }, [user])

    /**
     * Handle the click on the edit button
     */
    const handleEditClick = () => {
        setIsEditing(true)
    }

    /**
     * Handle the submission of the profile update form
     * 
     * @param {Event} e - The form submission event
     */
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateProfile({ firstName, lastName, token }))
        setIsEditing(false)
    }

    /**
     * Handle the click on the cancel button to reset form and exit editing mode
     */
    const handleCancel = () => {
        if (user) {
          setFirstName(user.firstName)
          setLastName(user.lastName)
        }
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
                <div className='btn-edit'>
                    <button type="submit" className="edit-button">Save</button>
                    <button type="button" className="edit-button" onClick={handleCancel}>Cancel</button>
                </div>
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