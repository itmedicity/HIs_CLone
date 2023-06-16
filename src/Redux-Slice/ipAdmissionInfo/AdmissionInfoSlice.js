// @ts-nocheck
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosinstance } from '../../controllers/AxiosConfig'

const getAdmissionList = createAsyncThunk('api/AdmissionList', (postData) => {
    return axiosinstance.post("/admission/getIpadmissionList", postData)
        .then((response) => {
            return response.data;
        })
})

const admissionList = {
    data: [],
    message: "",
    status: false,
}

const admissionListSlice = createSlice({
    name: "admissionListInformation",
    initialState: admissionList,
    reducers: {},
    extraReducers: {
        [getAdmissionList.pending]: (state) => {
            state.message = "pending"
            state.status = false
        },
        [getAdmissionList.rejected]: (state) => {
            state.message = "pending"
            state.status = false
        },
        [getAdmissionList.fulfilled]: (state, { payload }) => {
            state.data = payload.data
            state.message = payload.message
            state.status = true
        },
    }
})

export {
    getAdmissionList
}

export default admissionListSlice.reducer