import { createSlice } from '@reduxjs/toolkit';

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    data: [],
    isLoaded: false,
    convFilter: "",
    group_id: null,
    message: null,
    pagination: null
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
    },
    updatePagination: (state, action) => {
      state.pagination = action.payload;
    },
    clearNotification: async (state) => {
      const newDataArray = state.data.map(conv => {
        if (conv.id === state.group_id) {
            return { ...conv, notif: 0 };
        }
        return conv;
      });
      state.data = newDataArray;
    },
  },
});

export const { updateGroupId , updateData, updateFilter, updateMessage, updatePagination, clearNotification} = chatSlice.actions;

export default chatSlice.reducer;