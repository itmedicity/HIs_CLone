import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosinstance } from '../../controllers/AxiosConfig'

const getProincome1 = createAsyncThunk('api/proIncome1', (postData) => {
    return axiosinstance.post("/income/proincome1", postData)
        .then((response) => {
            return response.data;
        })
})

const getProincome2 = createAsyncThunk('api/proincome2', (postData) => {
    return axiosinstance.post("/income/proincome2", postData)
        .then((response) => {
            return response.data;
        })
})

const getProincome3 = createAsyncThunk('api/proincome3', (postData) => {
    return axiosinstance.post("/income/proincome3", postData)
        .then((response) => {
            return response.data;
        })
})

const getProincome4 = createAsyncThunk('api/proincome4', (postData) => {
    return axiosinstance.post("/income/proincome4", postData)
        .then((response) => {
            return response.data;
        })
})

const theaterIncome = createAsyncThunk('api/theaterIncome', (postData) => {
    return axiosinstance.post("/income/theaterIncome", postData)
        .then((response) => {
            return response.data;
        })
})

const getPatietTypeDiscount = createAsyncThunk('api/patientTypeDis', (postData) => {
    return axiosinstance.post("/patientType/patientTypeDis", postData)
        .then((response) => {
            return response.data;
        })
})

const initialState = {
    proincome1: {
        data: [],
        status: 0,
        message: "",
        income: true
    },
    proincome2: {
        data: [],
        status: 0,
        message: "",
        income: true
    },
    proincome3: {
        data: [],
        status: 0,
        message: "",
        income: true
    },
    proincome4: {
        data: [],
        status: 0,
        message: "",
        income: true
    },
    theaterIncome: {
        data: [],
        status: 0,
        message: "",
        income: true
    },
    patientTypeDiscount: {
        data: [],
        status: 0,
        message: "",
        income: false
    }
}

const incomeProcedureSlice = createSlice({
    name: "incomeDataPart",
    initialState,
    reducers: {},
    extraReducers: {
        // @ts-ignore
        [getProincome1.pending]: (state, { payload }) => {
            state.proincome1.status = 0
            state.proincome1.message = "pending"
            state.loading = true
        },
        // @ts-ignore
        [getProincome1.rejected]: (state, { payload }) => {
            state.proincome1.status = 2
            state.proincome1.message = "Error"
            state.loading = false
        },
        // @ts-ignore
        [getProincome1.fulfilled]: (state, { payload }) => {
            state.proincome1.status = payload.success
            state.proincome1.message = payload.message
            state.loading = false
            state.proincome1.data = payload.data
        },

        // @ts-ignore
        [getProincome2.pending]: (state, { payload }) => {
            state.proincome2.status = 0
            state.proincome2.message = "pending"
            state.loading = true
        },
        // @ts-ignore
        [getProincome2.rejected]: (state, { payload }) => {
            state.proincome2.status = 2
            state.proincome2.message = "Error"
            state.loading = false
        },
        // @ts-ignore
        [getProincome2.fulfilled]: (state, { payload }) => {
            state.proincome2.status = payload.success
            state.proincome2.message = payload.message
            state.loading = false
            state.proincome2.data = payload.data
        },

        // @ts-ignore
        [getProincome3.pending]: (state, { payload }) => {
            state.proincome3.status = 0
            state.proincome3.message = "pending"
            state.loading = true
        },
        // @ts-ignore
        [getProincome3.rejected]: (state, { payload }) => {
            state.proincome3.status = 2
            state.proincome3.message = "Error"
            state.loading = false
        },
        // @ts-ignore
        [getProincome3.fulfilled]: (state, { payload }) => {
            state.proincome3.status = payload.success
            state.proincome3.message = payload.message
            state.loading = false
            state.proincome3.data = payload.data
        },

        // @ts-ignore
        [getProincome4.pending]: (state, { payload }) => {
            state.proincome4.status = 0
            state.proincome4.message = "pending"
            state.loading = true
        },
        // @ts-ignore
        [getProincome4.rejected]: (state, { payload }) => {
            state.proincome4.status = 2
            state.proincome4.message = "Error"
            state.loading = false
        },
        // @ts-ignore
        [getProincome4.fulfilled]: (state, { payload }) => {
            state.proincome4.status = payload.success
            state.proincome4.message = payload.message
            state.loading = false
            state.proincome4.data = payload.data
        },

        // @ts-ignore
        [theaterIncome.pending]: (state, { payload }) => {
            state.theaterIncome.status = 0
            state.theaterIncome.message = "pending"
            state.loading = true
        },
        // @ts-ignore
        [theaterIncome.rejected]: (state, { payload }) => {
            state.theaterIncome.status = 2
            state.theaterIncome.message = "Error"
            state.loading = false
        },
        // @ts-ignore
        [theaterIncome.fulfilled]: (state, { payload }) => {
            state.theaterIncome.status = payload.success
            state.theaterIncome.message = payload.message
            state.loading = false
            state.theaterIncome.data = payload.data
        },

        // @ts-ignore
        [getPatietTypeDiscount.pending]: (state, { payload }) => {
            state.patientTypeDiscount.status = 0
            state.patientTypeDiscount.message = "pending"
            state.loading = true
        },
        // @ts-ignore
        [getPatietTypeDiscount.rejected]: (state, { payload }) => {
            state.patientTypeDiscount.status = 2
            state.patientTypeDiscount.message = "Error"
            state.loading = false
        },
        // @ts-ignore
        [getPatietTypeDiscount.fulfilled]: (state, { payload }) => {
            state.patientTypeDiscount.status = payload.success
            state.patientTypeDiscount.message = payload.message
            state.loading = false
            state.patientTypeDiscount.data = payload.data
        },
    }
})

export {
    getProincome1,
    getProincome2,
    getProincome3,
    getProincome4,
    theaterIncome,
    getPatietTypeDiscount
}

export default incomeProcedureSlice.reducer