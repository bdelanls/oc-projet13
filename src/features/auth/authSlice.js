import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authAPI from '../../api/auth'

// Thunk pour la connexion
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password, rememberMe }, { rejectWithValue }) => {
    try {
      const data = await authAPI.login(email, password)
      const { token } = data.body

      // Stocker le token
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
    error: null,
    user: null
  },
  reducers: {
    logout: (state) => {
      state.token = null
      localStorage.removeItem('token')
      sessionStorage.removeItem('token')
    },
    resetError: (state) => {
      state.error = null
    },
    setUser: (state, action) => {
      state.user = action.payload
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

export const { logout, resetError, setUser } = authSlice.actions

export default authSlice.reducer
