import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosinstance } from '../../controllers/AxiosConfig'

const getMonthlyOpVisitCount = createAsyncThunk('/api/rolprocess/opcount', (postData) => {
    return axiosinstance.post("/rolprocess/getopcount", postData)
        .then((response) => {
            return response.data;
        })
})

const getMonthlyIpVisitCount = createAsyncThunk('/api/rolprocess/ipcount', (postData) => {
    return axiosinstance.post("/rolprocess/getipcount", postData)
        .then((response) => {
            return response.data;
        })
})

const getSoledMedicinesQnty = createAsyncThunk('/api/rolprocess/soledqnty', (postData) => {
    return axiosinstance.post("/rolprocess/getsoledqnty", postData)
        .then((response) => {
            return response.data;
        })
})


const initialState = {
    monthlyOpCount: {
        data: [],
        status: 0,
        message: "",
    },
    monthlyIpCount: {
        data: [],
        status: 0,
        message: "",
    },
    medicineSoledQnty: {
        data: [],
        status: 0,
        message: "",
    },
    loading: true
}

const rolProcessSlice = createSlice({
    name: "rolAnalysis",
    initialState,
    reducers: {},
    extraReducers: {

        // opcount
        [getMonthlyOpVisitCount.pending]: (state, { payload }) => {
            state.monthlyOpCount.status = 0
            state.monthlyOpCount.message = "pending"
            state.loading = true
        },

        [getMonthlyOpVisitCount.rejected]: (state, { payload }) => {
            state.monthlyOpCount.status = 2
            state.monthlyOpCount.message = "Error"
            state.loading = false
        },

        [getMonthlyOpVisitCount.fulfilled]: (state, { payload }) => {
            state.monthlyOpcount.status = payload.success
            state.monthlyOpcount.message = payload.message
            state.loading = false
            state.monthlyOpcount.data = payload.data
        },

        // ipcount

        [getMonthlyIpVisitCount.pending]: (state, { payload }) => {
            state.monthlyIpCount.status = 0
            state.monthlyIpCount.message = "pending"
            state.loading = true
        },

        [getMonthlyIpVisitCount.rejected]: (state, { payload }) => {
            state.monthlyIpCount.status = 2
            state.monthlyIpCount.message = "Error"
            state.loading = false
        },

        [getMonthlyIpVisitCount.fulfilled]: (state, { payload }) => {
            state.monthlyIpCount.status = payload.success
            state.monthlyIpCount.message = payload.message
            state.loading = false
            state.monthlyIpCount.data = payload.data
        },

        //medicinessoled

        [getSoledMedicinesQnty.pending]: (state, { payload }) => {
            state.medicineSoledQnty.status = 0
            state.medicineSoledQnty.message = "pending"
            state.loading = true
        },

        [getSoledMedicinesQnty.rejected]: (state, { payload }) => {
            state.medicineSoledQnty.status = 2
            state.medicineSoledQnty.message = "Error"
            state.loading = false
        },

        [getSoledMedicinesQnty.fulfilled]: (state, { payload }) => {
            state.medicineSoledQnty.status = payload.success
            state.medicineSoledQnty.message = payload.message
            state.loading = false
            state.medicineSoledQnty.data = payload.data
        },

    }
})
export {
    getMonthlyOpVisitCount,
    getMonthlyIpVisitCount,
    getSoledMedicinesQnty,
}
export default rolProcessSlice.reducer;