import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosinstance } from '../../controllers/AxiosConfig'

const getPharmacyTaxReport = createAsyncThunk('/api/selectreport', (postData) => {
    return axiosinstance.post("/pharmacytax/selectreport", postData)
        .then((response) => {
            return response.data;
        })
})

const getPharmacyTaxReportIpReturn = createAsyncThunk('/api/ipreturn', (postData) => {
    return axiosinstance.post("/pharmacytax/ipreturn", postData)
        .then((response) => {
            return response.data;
        })
})

const getPharmacyTaxReportIp = createAsyncThunk('/api/ipmedsale', (postData) => {
    return axiosinstance.post("/pharmacytax/ipmedsale", postData)
        .then((response) => {
            return response.data;
        })
})


// const getGstReportSum = createAsyncThunk('/api/selectsum', (postData) => {
//     return axiosinstance.post("/pharmacytax/selectsum", postData)
//         .then((response) => {
//             return response.data;
//         })
// })

const initialState = {
    pharmacyreport: {
        data: [],
        status: 0,
        message: "",
    },

    // gstSum: {
    //     data: [],
    //     status: 0,
    //     message: "",
    // },
    // loading: true
    pharmacyreportReturn: {
        data: [],
        status: 0,
        message: "",
    },
    pharmacyreportIP: {
        data: [],
        status: 0,
        message: "",
    },

}

const pharmacyTaxSlice = createSlice({
    name: "gstReport",
    initialState,
    reducers: {},
    extraReducers: {

        [getPharmacyTaxReport.pending]: (state, { payload }) => {
            state.pharmacyreport.status = 0
            state.pharmacyreport.message = "pending"
            state.loading = true
        },

        [getPharmacyTaxReport.rejected]: (state, { payload }) => {
            state.pharmacyreport.status = 2
            state.pharmacyreport.message = "Error"
            state.loading = false
        },

        [getPharmacyTaxReport.fulfilled]: (state, { payload }) => {
            state.pharmacyreport.status = payload.success
            state.pharmacyreport.message = payload.message
            state.loading = false
            state.pharmacyreport.data = payload.data
        },


        //report2
        [getPharmacyTaxReportIpReturn.pending]: (state, { payload }) => {
            state.pharmacyreportReturn.status = 0
            state.pharmacyreportReturn.message = "pending"
            state.loading = true
        },

        [getPharmacyTaxReportIpReturn.rejected]: (state, { payload }) => {
            state.pharmacyreportReturn.status = 2
            state.pharmacyreportReturn.message = "Error"
            state.loading = false
        },

        [getPharmacyTaxReportIpReturn.fulfilled]: (state, { payload }) => {
            state.pharmacyreportReturn.status = payload.success
            state.pharmacyreportReturn.message = payload.message
            state.loading = false
            state.pharmacyreportReturn.data = payload.data
        },

        //report3

        [getPharmacyTaxReportIp.pending]: (state, { payload }) => {
            state.pharmacyreportIP.status = 0
            state.pharmacyreportIP.message = "pending"
            state.loading = true
        },

        [getPharmacyTaxReportIp.rejected]: (state, { payload }) => {
            state.pharmacyreportIP.status = 2
            state.pharmacyreportIP.message = "Error"
            state.loading = false
        },

        [getPharmacyTaxReportIp.fulfilled]: (state, { payload }) => {
            state.pharmacyreportIP.status = payload.success
            state.pharmacyreportIP.message = payload.message
            state.loading = false
            state.pharmacyreportIP.data = payload.data
        },

        // [getGstReportSum.pending]: (state, { payload }) => {
        //     state.gstSum.status = 0
        //     state.gstSum.message = "pending"
        //     state.loading = true
        // },

        // [getGstReportSum.rejected]: (state, { payload }) => {
        //     state.gstSum.status = 2
        //     state.gstSum.message = "Error"
        //     state.loading = false
        // },

        // [getGstReportSum.fulfilled]: (state, { payload }) => {
        //     state.gstSum.status = payload.success
        //     state.gstSum.message = payload.message
        //     state.loading = false
        //     state.gstSum.data = payload.data
        // },

    }
})
export const getGstTaxReportSelect = (state) => {
    return state.gstReportPharmacy.pharmacyreport.data;
}
export const getGstTaxReportSelect2 = (state) => {
    return state.gstReportPharmacy.pharmacyreportReturn.data;
}
export const getGstTaxReportSelect3 = (state) => {
    return state.gstReportPharmacy.pharmacyreportIP.data;
}
// export const getGstReportSumSelect = (state) => {
//     return state.gstReportPharmacy.gstSum.data;
// }
export {
    getPharmacyTaxReport,
    getPharmacyTaxReportIpReturn,
    getPharmacyTaxReportIp
}

export default pharmacyTaxSlice.reducer;