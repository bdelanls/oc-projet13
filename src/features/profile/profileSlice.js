import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { produce } from 'immer'
import profileAPI from './profileAPI'

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
    clearProfile: (state) => {
      state.user = null
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
        return produce(state, draft => {
          draft.status = 'succeeded'
          draft.user = action.payload
        })
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  }
})

export const { clearProfile } = profileSlice.actions

export default profileSlice.reducer
