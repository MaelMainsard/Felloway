import { createSlice } from '@reduxjs/toolkit';
import { firestore } from '../config/Firebase';
import { getLoggedUser } from "../config/util";
import { collection, getDocs, query, updateDoc} from "firebase/firestore";

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

      // const user_id = getLoggedUser().uid;
      // const q = query(collection(firestore, "groups", state.group_id, 'messages'));
      // const querySnapshot = await getDocs(q);

      // for (const doc of querySnapshot.docs) {
      //     let users_array = doc.data().view_by;
      //     users_array.push(user_id);
      //     await updateDoc(doc.ref, { view_by: users_array });
      // }
    },
  },
});

export const { updateGroupId , updateData, updateFilter, updateMessage, updatePagination, clearNotification} = chatSlice.actions;

export default chatSlice.reducer;