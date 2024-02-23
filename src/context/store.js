import { configureStore } from '@reduxjs/toolkit'
import BottomNavBarSlice from '../features/BottomNavBarSlice'

export const store = configureStore({
    reducer: {
        BottomNavBarSlice: BottomNavBarSlice,
    },
})