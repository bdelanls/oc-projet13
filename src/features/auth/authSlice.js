import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = 'http://localhost:3001/api/v1'

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials) => {
  const response = await axios.post(`${API_URL}/user/login`, credentials)
  return response.data
})

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    status: 'idle',
    error: null
  },
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.token = action.payload.token
        state.user = action.payload.user
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer
