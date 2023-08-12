import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosinstance } from '../../controllers/AxiosConfig'

const getProincomeTmch1 = createAsyncThunk('api/proIncomeTmch1', (postData) => {
    return axiosinstance.post("/incomeTmch/proincome1", postData)
        .then((response) => {
            return response.data;
        })
})

const getProincomeTmch2 = createAsyncThunk('api/proincomeTmch2', (postData) => {
    return axiosinstance.post("/incomeTmch/proincome2", postData)
        .then((response) => {
            return response.data;
        })
})

const getProincomeTmch3 = createAsyncThunk('api/proincomeTmch3', (postData) => {
    return axiosinstance.post("/incomeTmch/proincome3", postData)
        .then((response) => {
            return response.data;
        })
})

const getProincomeTmch4 = createAsyncThunk('api/proincomeTmch4', (postData) => {
    return axiosinstance.post("/incomeTmch/proincome4", postData)
        .then((response) => {
            return response.data;
        })
})

const theaterIncomeTmch = createAsyncThunk('api/theaterIncomeTmch', (postData) => {
    return axiosinstance.post("/incomeTmch/theaterIncome", postData)
        .then((response) => {
            return response.data;
        })
})

const getPatietTypeDiscountTmch = createAsyncThunk('api/patientTypeDisTmch', (postData) => {
    return axiosinstance.post("/patientTypeTmch/patientTypeDis", postData)
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

const incomeProcedureTmchSlice = createSlice({
    name: "incomeDataPartTmch",
    initialState,
    reducers: {},
    extraReducers: {
        // @ts-ignore
        [getProincomeTmch1.pending]: (state, { payload }) => {
            state.proincome1.status = 0
            state.proincome1.message = "pending"
            state.loading = true
        },
        // @ts-ignore
        [getProincomeTmch1.rejected]: (state, { payload }) => {
            state.proincome1.status = 2
            state.proincome1.message = "Error"
            state.loading = false
        },
        // @ts-ignore
        [getProincomeTmch1.fulfilled]: (state, { payload }) => {
            state.proincome1.status = payload.success
            state.proincome1.message = payload.message
            state.loading = false
            state.proincome1.data = payload.data
        },

        // @ts-ignore
        [getProincomeTmch2.pending]: (state, { payload }) => {
            state.proincome2.status = 0
            state.proincome2.message = "pending"
            state.loading = true
        },
        // @ts-ignore
        [getProincomeTmch2.rejected]: (state, { payload }) => {
            state.proincome2.status = 2
            state.proincome2.message = "Error"
            state.loading = false
        },
        // @ts-ignore
        [getProincomeTmch2.fulfilled]: (state, { payload }) => {
            state.proincome2.status = payload.success
            state.proincome2.message = payload.message
            state.loading = false
            state.proincome2.data = payload.data
        },

        // @ts-ignore
        [getProincomeTmch3.pending]: (state, { payload }) => {
            state.proincome3.status = 0
            state.proincome3.message = "pending"
            state.loading = true
        },
        // @ts-ignore
        [getProincomeTmch3.rejected]: (state, { payload }) => {
            state.proincome3.status = 2
            state.proincome3.message = "Error"
            state.loading = false
        },
        // @ts-ignore
        [getProincomeTmch3.fulfilled]: (state, { payload }) => {
            state.proincome3.status = payload.success
            state.proincome3.message = payload.message
            state.loading = false
            state.proincome3.data = payload.data
        },

        // @ts-ignore
        [getProincomeTmch4.pending]: (state, { payload }) => {
            state.proincome4.status = 0
            state.proincome4.message = "pending"
            state.loading = true
        },
        // @ts-ignore
        [getProincomeTmch4.rejected]: (state, { payload }) => {
            state.proincome4.status = 2
            state.proincome4.message = "Error"
            state.loading = false
        },
        // @ts-ignore
        [getProincomeTmch4.fulfilled]: (state, { payload }) => {
            state.proincome4.status = payload.success
            state.proincome4.message = payload.message
            state.loading = false
            state.proincome4.data = payload.data
        },

        // @ts-ignore
        [theaterIncomeTmch.pending]: (state, { payload }) => {
            state.theaterIncome.status = 0
            state.theaterIncome.message = "pending"
            state.loading = true
        },
        // @ts-ignore
        [theaterIncomeTmch.rejected]: (state, { payload }) => {
            state.theaterIncome.status = 2
            state.theaterIncome.message = "Error"
            state.loading = false
        },
        // @ts-ignore
        [theaterIncomeTmch.fulfilled]: (state, { payload }) => {
            state.theaterIncome.status = payload.success
            state.theaterIncome.message = payload.message
            state.loading = false
            state.theaterIncome.data = payload.data
        },

        // @ts-ignore
        [getPatietTypeDiscountTmch.pending]: (state, { payload }) => {
            state.patientTypeDiscount.status = 0
            state.patientTypeDiscount.message = "pending"
            state.loading = true
        },
        // @ts-ignore
        [getPatietTypeDiscountTmch.rejected]: (state, { payload }) => {
            state.patientTypeDiscount.status = 2
            state.patientTypeDiscount.message = "Error"
            state.loading = false
        },
        // @ts-ignore
        [getPatietTypeDiscountTmch.fulfilled]: (state, { payload }) => {
            state.patientTypeDiscount.status = payload.success
            state.patientTypeDiscount.message = payload.message
            state.loading = false
            state.patientTypeDiscount.data = payload.data
        },
    }
})

export {
    getProincomeTmch1,
    getProincomeTmch2,
    getProincomeTmch3,
    getProincomeTmch4,
    theaterIncomeTmch,
    getPatietTypeDiscountTmch
}

export default incomeProcedureTmchSlice.reducer