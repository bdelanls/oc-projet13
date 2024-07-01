import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authAPI from '../../api/auth'
import profileAPI from '../profile/profileAPI'

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

// Thunk pour récupérer le profil utilisateur
export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (token, { rejectWithValue }) => {
    try {
      const response = await profileAPI.getProfile(token)
      return response.body
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Thunk pour mettre à jour le profil utilisateur
export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async ({ firstName, lastName, token }, { rejectWithValue }) => {
    try {
      const response = await profileAPI.updateProfile(token, { firstName, lastName })
      return response.body
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
      state.user = null
      localStorage.removeItem('token')
      sessionStorage.removeItem('token')
    },
    resetError: (state) => {
      state.error = null
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
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
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(updateProfile.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  }
})

export const { logout, resetError, setUser, setToken } = authSlice.actions

export default authSlice.reducer
