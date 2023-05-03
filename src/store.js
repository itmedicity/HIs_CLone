import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './Redux-Slice/counterSlice'
import loginInformSlice from './Redux-Slice/LoginSlice/LoginInfomration'

export const store = configureStore({
    reducer: {
        counter: counterSlice,
        login: loginInformSlice
    },
})