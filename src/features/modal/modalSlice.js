import { createSlice } from '@reduxjs/toolkit'

// État initial de la modale
const initialState = {
  isOpen: false
}

// Slice de Redux pour gérer l'état de la modale
const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true
    },
    closeModal: (state) => {
      state.isOpen = false
    }
  }
})

// Actions générées par le slice de la modale
export const { openModal, closeModal } = modalSlice.actions

export default modalSlice.reducer
