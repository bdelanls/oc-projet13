import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import profileAPI from './profileAPI'

/**
 * Thunk for fetching user profile.
 * Sends a request to the API to fetch the user's profile using the provided token.
 */
export const fetchUserProfile = createAsyncThunk(
  'profile/fetchUserProfile',
  async (token, { rejectWithValue }) => {
    try {
      const response = await profileAPI.getProfile(token)
      return response.body
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

/**
 * Thunk for updating user profile.
 * Sends a request to the API to update the user's profile with the provided first name, last name, and token.
 */
export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async ({ firstName, lastName, token }, { rejectWithValue }) => {
    try {
      const response = await profileAPI.updateProfile(token, { firstName, lastName })
      return response.body
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    user: null,
    status: 'idle',
    error: null
  },
  reducers: {
    // Clears the user profile from the state.
    clearProfile: (state) => {
      state.user = null
    },
    // Sets the user profile in the state.
    setUser: (state, action) => {
      state.user = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
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

export const { clearProfile, setUser } = profileSlice.actions

export default profileSlice.reducer
