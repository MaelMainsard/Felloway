import { configureStore } from '@reduxjs/toolkit'
import BottomNavBarSlice from '../features/BottomNavBarSlice'
import groupSlice from '../features/ChatMenuSlice'

export const store = configureStore({
    reducer: {
        BottomNavBarSlice: BottomNavBarSlice,
        groups: groupSlice
    },
})