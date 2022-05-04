import { configureStore } from '@reduxjs/toolkit'
import DashBoardReducer from '../features/DashBoard/DashBoardSlice'
export const store = configureStore({
    reducer:{ DashBoard: DashBoardReducer,}
})
