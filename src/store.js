import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './Redux-Slice/counterSlice'
import loginInformSlice from './Redux-Slice/LoginSlice/LoginInfomration'
import collectionSlice from './Redux-Slice/incomeCollectionSlice/collectionSlice'

export const store = configureStore({
    reducer: {
        counter: counterSlice,
        login: loginInformSlice,
        collection: collectionSlice
    },
})