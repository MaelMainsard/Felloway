import { createSlice } from '@reduxjs/toolkit';

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    data: [],
    isLoaded: false,
    convFilter: "",
    group_id: null,
    message: null
  },
  reducers: {
    updateData: (state, action) => {
      state.data = action.payload;
      state.isLoaded = true;
    },
    updateFilter: (state, action) => {
      state.convFilter = action.payload;
    },
    updateGroupId: (state, action) => {
      state.group_id = action.payload;
    },
    updateMessage: (state, action) => {
      state.message = action.payload;
    }
  },
});

export const { updateGroupId , updateData, updateFilter, updateMessage} = chatSlice.actions;

export default chatSlice.reducer;