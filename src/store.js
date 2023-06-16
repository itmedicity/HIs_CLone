import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './Redux-Slice/counterSlice'
import loginInformSlice from './Redux-Slice/LoginSlice/LoginInfomration'
import collectionSlice from './Redux-Slice/incomeCollectionSlice/collectionSlice'
import incomeSlice from './Redux-Slice/incomeCollectionSlice/incomeSlice'
import incomeProcedureSlice from './Redux-Slice/incomeCollectionSlice/incomeProcedureSlice'
import misGroupMastSlice from './Redux-Slice/incomeCollectionSlice/misGroupMastSlice'

export const store = configureStore({
    reducer: {
        counter: counterSlice,
        login: loginInformSlice,
        collection: collectionSlice,
        pharmacyIncome: incomeSlice,
        procedureIncome: incomeProcedureSlice,
        misGroup: misGroupMastSlice
    },
})