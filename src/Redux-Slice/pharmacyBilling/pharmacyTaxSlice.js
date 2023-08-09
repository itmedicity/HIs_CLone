import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosinstance } from '../../controllers/AxiosConfig'

const getPharmacyTaxReport = createAsyncThunk('/api/pharmacytax', (postData) => {
    return axiosinstance.post("/pharmacytax/selectreport", postData)
        .then((response) => {
            return response.data;
        })
})

const initialState = {
    pharmacytax: {
        data: [],
        status: 0,
        message: "",
    },
    loading: true
}

const pharmacyTaxSlice = createSlice({
    name: "gstReport",
    initialState,
    reducers: {},
    extraReducers: {

        [getPharmacyTaxReport.pending]: (state, { payload }) => {
            state.pharmacytax.status = 0
            state.pharmacytax.message = "pending"
            state.loading = true
        },

        [getPharmacyTaxReport.rejected]: (state, { payload }) => {
            state.pharmacytax.status = 2
            state.pharmacytax.message = "Error"
            state.loading = false
        },

        [getPharmacyTaxReport.fulfilled]: (state, { payload }) => {
            state.pharmacytax.status = payload.success
            state.pharmacytax.message = payload.message
            state.loading = false
            state.pharmacytax.data = payload.data
        },
    }
})

export {
    getPharmacyTaxReport,
}

export default pharmacyTaxSlice.reducer;