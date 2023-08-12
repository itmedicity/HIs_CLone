// @ts-nocheck
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosinstance } from '../../controllers/AxiosConfig'

const getDischargedPatientList = createAsyncThunk('api/getDischargePtFromOracle', (postData) => {
    return axiosinstance.post("/admission/getDischargePtFromOracle", postData)
        .then((response) => {
            return response.data;
        })
})

const dischargedPatientList = {
    data: [],
    message: "",
    status: false,
}

const dischargedPatientTsshSlice = createSlice({
    name: "getDischargedPatientList",
    initialState: dischargedPatientList,
    reducers: {},
    extraReducers: {
        [getDischargedPatientList.pending]: (state) => {
            state.message = "pending"
            state.status = false
        },
        [getDischargedPatientList.rejected]: (state) => {
            state.message = "pending"
            state.status = false
        },
        [getDischargedPatientList.fulfilled]: (state, { payload }) => {
            state.data = payload.data
            state.message = payload.message
            state.status = true
        },
    }
})

export {
    getDischargedPatientList
}

export default dischargedPatientTsshSlice.reducer