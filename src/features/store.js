import { configureStore } from '@reduxjs/toolkit'
import modalReducer from './modal/modalSlice'
import authReducer from './auth/authSlice'
import profileReducer from './profile/profileSlice'


/**
 * Configuration of the Redux store.
 * Combines modal, auth, and profile reducers.
 * 
 * The store is the central place where the state of the application is stored.
 * Each reducer manages its respective slice of the state.
 */
export const store = configureStore({
  reducer: {
    modal: modalReducer,      // Handles modal state
    auth: authReducer,        // Handles authentication state
    profile: profileReducer   // Handles user profile state
  }
})
