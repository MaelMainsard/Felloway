import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 5
}

export const BottomNavBarSlice = createSlice({
  name: 'BottomNavBarSlice',
  initialState,
  reducers: {
    setValue: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setValue } = BottomNavBarSlice.actions

export default BottomNavBarSlice.reducer