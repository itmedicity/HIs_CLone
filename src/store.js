import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './Redux-Slice/counterSlice'
import loginInformSlice from './Redux-Slice/LoginSlice/LoginInfomration'
import collectionSlice from './Redux-Slice/incomeCollectionSlice/collectionSlice'
import incomeSlice from './Redux-Slice/incomeCollectionSlice/incomeSlice'
import incomeProcedureSlice from './Redux-Slice/incomeCollectionSlice/incomeProcedureSlice'
import misGroupMastSlice from './Redux-Slice/incomeCollectionSlice/misGroupMastSlice'
import AdmissionInfoSlice from './Redux-Slice/ipAdmissionInfo/AdmissionInfoSlice'
import collectionTmchSlice from './Redux-Slice/incomeCollectionTmchSlice/collectionTmchSlice'
import incomeProcedureTmchSlice from './Redux-Slice/incomeCollectionTmchSlice/incomeProcedureTmchSlice'
import incomeTmchSlice from './Redux-Slice/incomeCollectionTmchSlice/incomeTmchSlice'
import collectionTsshSlice from './Redux-Slice/incomeCollectionTsshSlice/collectionTsshSlice'
import incomeProcedureTsshSlice from './Redux-Slice/incomeCollectionTsshSlice/incomeProcedureTsshSlice'
import incomeTsshSlice from './Redux-Slice/incomeCollectionTsshSlice/incomeTsshSlice'

export const store = configureStore({
    reducer: {
        counter: counterSlice,
        login: loginInformSlice,

        collection: collectionSlice,
        pharmacyIncome: incomeSlice,
        procedureIncome: incomeProcedureSlice,

        misGroup: misGroupMastSlice,
        admissionList: AdmissionInfoSlice,

        collectionTmch: collectionTmchSlice,
        procedureIncomeTmch: incomeProcedureTmchSlice,
        pharmacyIncomeTmch: incomeTmchSlice,

        collectionTssh: collectionTsshSlice,
        procedureIncomeTssh: incomeProcedureTsshSlice,
        pharmacyIncomeTssh: incomeTsshSlice,
    },
})