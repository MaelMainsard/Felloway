import { configureStore } from '@reduxjs/toolkit'
import BottomNavBarSlice from '../features/BottomNavBarSlice'
import chatSlice from '../features/ChatSlice'

export const store = configureStore({
    reducer: {
        BottomNavBarSlice: BottomNavBarSlice,
        chat: chatSlice
    },
})