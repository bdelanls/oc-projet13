import { configureStore } from '@reduxjs/toolkit'
import modalReducer from './modal/modalSlice'
import authReducer from './auth/authSlice'
import profileReducer from './profile/profileSlice'

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    auth: authReducer,
    profile: profileReducer
  }
})
