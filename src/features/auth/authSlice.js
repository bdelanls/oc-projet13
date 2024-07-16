import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authAPI from '../../api/auth'

/**
 * Thunk for user login.
 * Sends a login request to the API and stores the token in either 
 * localStorage or sessionStorage based on the user's preference.
 */
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password, rememberMe }, { rejectWithValue }) => {
    try {
      const data = await authAPI.login(email, password)
      const { token } = data.body

      // Store the token
      if (rememberMe) {
        localStorage.setItem('token', token)
      } else {
        sessionStorage.setItem('token', token)
      }

      return token
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    status: 'idle',
    error: null
  },
  reducers: {
    /**
     * Logs out the user by removing the token and user data from the state and from local/session storage.
     */
    logout: (state) => {
      state.token = null
      localStorage.removeItem('token')
      sessionStorage.removeItem('token')
    },
    /**
     * Resets errors in the auth state.
     */
    resetError: (state) => {
      state.error = null
    },
    /**
     * Sets the token in the auth state.
     */
    setToken: (state, action) => {
      state.token = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.token = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  }
})

export const { logout, resetError, setToken } = authSlice.actions

export default authSlice.reducer
