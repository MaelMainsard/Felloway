import { createSlice } from '@reduxjs/toolkit';

export const groupSlice = createSlice({
  name: 'groups',
  initialState: {
    data: [],
    isLoaded: false,
  },
  reducers: {
    updateData: (state, action) => {
      state.data = action.payload;
      state.isLoaded = true;
    },
  },
});

export const { updateData } = groupSlice.actions;

export default groupSlice.reducer;