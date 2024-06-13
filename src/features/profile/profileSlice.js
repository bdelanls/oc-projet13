import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = 'http://localhost:3001/api/v1'

export const fetchUserProfile = createAsyncThunk('profile/fetchUserProfile', async (token) => {
  const response = await axios.post(`${API_URL}/user/profile`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
})

export const updateUserProfile = createAsyncThunk('profile/updateUserProfile', async ({ token, userData }) => {
  const response = await axios.put(`${API_URL}/user/profile`, userData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
})

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    userInfo: null,
    status: 'idle',
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.userInfo = action.payload
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.userInfo = { ...state.userInfo, ...action.payload }
      })
  }
})

export default profileSlice.reducer
