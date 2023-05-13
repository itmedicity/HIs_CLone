import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosinstance } from '../../controllers/AxiosConfig'

//ADVANCE COLLECTION
const getAdvanceCollection = createAsyncThunk('api/advanceCollection', (postData) => {
    return axiosinstance.post("/collection/advanceCollection", postData)
        .then((response) => {
            return response.data;
        })
})
//ADVANCE REFUND
const getAdvanceRefund = createAsyncThunk('api/advanceRefund', (postData) => {
    return axiosinstance.post("/collection/advanceRefund", postData)
        .then((response) => {
            return response.data;
        })
})
//ADVANCE SETTLED
const getAdvanceSettled = createAsyncThunk('api/advanceSettled', (postData) => {
    return axiosinstance.post("/collection/advanceSettled", postData)
        .then((response) => {
            return response.data;
        })
})
//COLLECTION AGAINST SALE TOTAL
const getcollectionagainSaleTotal = createAsyncThunk('api/collectionagainSaleTotal', (postData) => {
    return axiosinstance.post("/collection/collectionagainSaleTotal", postData)
        .then((response) => {
            return response.data;
        })
})
//COLLECTION AGAINST SALE DEDUCTION
const getcollectionagainSaleDeduction = createAsyncThunk('api/collectionagainSaleDeduction', (postData) => {
    return axiosinstance.post("/collection/collectionagainSaleDeduction", postData)
        .then((response) => {
            return response.data;
        })
})
//COMPLIMENTORY
const getcomplimentory = createAsyncThunk('api/complimentory', (postData) => {
    return axiosinstance.post("/collection/complimentory", postData)
        .then((response) => {
            return response.data;
        })
})
//CREDIT INSURANCE BILL COLLECTION
const getcreditInsuranceBillCollection = createAsyncThunk('api/creditInsuranceBillCollection', (postData) => {
    return axiosinstance.post("/collection/creditInsuranceBillCollection", postData)
        .then((response) => {
            return response.data;
        })
})
//IP CONSOLIDATED DISCOUNT
const getIpconsolidatedDiscount = createAsyncThunk('api/ipConsolidatedDiscount', (postData) => {
    return axiosinstance.post("/collection/ipConsolidatedDiscount", postData)
        .then((response) => {
            return response.data;
        })
})
//IP PREVIOUS DAY DISCOUNT
const getipPreviousDayDiscount = createAsyncThunk('api/ipPreviousDayDiscount', (postData) => {
    return axiosinstance.post("/collection/ipPreviousDayDiscount", postData)
        .then((response) => {
            return response.data;
        })
})
//UNSETTLED
const getunsettledAmount = createAsyncThunk('api/unsettledAmount', (postData) => {
    return axiosinstance.post("/collection/unsettledAmount", postData)
        .then((response) => {
            return response.data;
        })
})

const initialState = {
    advanceCollection: {
        data: [],
        status: 0,
        message: "",
    },
    advanceRefund: {
        data: [],
        status: 0,
        message: "",
    },
    advanceSettled: {
        data: [],
        status: 0,
        message: "",
    },
    collectionAgainstSalesTotal: {
        data: [],
        status: 0,
        message: "",
    },
    collectionAgainstSalesDeduction: {
        data: [],
        status: 0,
        message: "",
    },
    complimentory: {
        data: [],
        status: 0,
        message: "",
    },
    creditInsuranceBillCollection: {
        data: [],
        status: 0,
        message: "",
    },
    ipConsolidatedDiscount: {
        data: [],
        status: 0,
        message: "",
    },
    ipPreviousDayDiscount: {
        data: [],
        status: 0,
        message: "",
    },
    unsettledAmount: {
        data: [],
        status: 0,
        message: "",
    },
    loading: true
}

const collectionSlice = createSlice({
    name: "incomeData",
    initialState,
    reducers: {},
    extraReducers: {
        //Advance Collection
        // @ts-ignore
        [getAdvanceCollection.pending]: (state, { payload }) => {
            state.advanceCollection.status = 0
            state.advanceCollection.message = "pending"
            state.loading = true
        },
        // @ts-ignore
        [getAdvanceCollection.rejected]: (state, { payload }) => {
            state.advanceCollection.status = 2
            state.advanceCollection.message = "Error"
            state.loading = false
        },
        // @ts-ignore
        [getAdvanceCollection.fulfilled]: (state, { payload }) => {
            state.advanceCollection.status = payload.success
            state.advanceCollection.message = payload.message
            state.loading = false
            state.advanceCollection.data = payload.data
        },
        //AdvanceRefund
        // @ts-ignore
        [getAdvanceRefund.pending]: (state, { payload }) => {
            state.advanceRefund.status = 0
            state.advanceRefund.message = "pending"
            state.loading = true
        },
        // @ts-ignore
        [getAdvanceRefund.rejected]: (state, { payload }) => {
            state.advanceRefund.status = 2
            state.advanceRefund.message = "Error"
            state.loading = false
        },
        // @ts-ignore
        [getAdvanceRefund.fulfilled]: (state, { payload }) => {
            state.advanceRefund.status = payload.success
            state.advanceRefund.message = payload.message
            state.advanceRefund.data = payload.data
            state.loading = false
        },
        // @ts-ignore
        [getAdvanceSettled.pending]: (state, { payload }) => {
            state.advanceSettled.status = 0
            state.advanceSettled.message = "pending"
            state.loading = true
        },
        // @ts-ignore
        [getAdvanceSettled.rejected]: (state, { payload }) => {
            state.advanceSettled.status = 2
            state.advanceSettled.message = "Error"
            state.loading = false
        },
        // @ts-ignore
        [getAdvanceSettled.fulfilled]: (state, { payload }) => {
            state.advanceSettled.status = payload.success
            state.advanceSettled.message = payload.message
            state.advanceSettled.data = payload.data
            state.loading = false
        },

        // @ts-ignore
        [getcollectionagainSaleTotal.pending]: (state, { payload }) => {
            state.collectionAgainstSalesTotal.status = 0
            state.collectionAgainstSalesTotal.message = "pending"
            state.loading = true
        },
        // @ts-ignore
        [getcollectionagainSaleTotal.rejected]: (state, { payload }) => {
            state.collectionAgainstSalesTotal.status = 2
            state.collectionAgainstSalesTotal.message = "Error"
            state.loading = false
        },
        // @ts-ignore
        [getcollectionagainSaleTotal.fulfilled]: (state, { payload }) => {
            state.collectionAgainstSalesTotal.status = payload.success
            state.collectionAgainstSalesTotal.message = payload.message
            state.collectionAgainstSalesTotal.data = payload.data
            state.loading = false
        },

        // @ts-ignore
        [getcollectionagainSaleDeduction.pending]: (state, { payload }) => {
            state.collectionAgainstSalesDeduction.status = 0
            state.collectionAgainstSalesDeduction.message = "pending"
            state.loading = true
        },
        // @ts-ignore
        [getcollectionagainSaleDeduction.rejected]: (state, { payload }) => {
            state.collectionAgainstSalesDeduction.status = 2
            state.collectionAgainstSalesDeduction.message = "Error"
            state.loading = false
        },
        // @ts-ignore
        [getcollectionagainSaleDeduction.fulfilled]: (state, { payload }) => {
            state.collectionAgainstSalesDeduction.status = payload.success
            state.collectionAgainstSalesDeduction.message = payload.message
            state.collectionAgainstSalesDeduction.data = payload.data
            state.loading = false
        },

        // @ts-ignore
        [getcomplimentory.pending]: (state, { payload }) => {
            state.complimentory.status = 0
            state.complimentory.message = "pending"
            state.loading = true
        },
        // @ts-ignore
        [getcomplimentory.rejected]: (state, { payload }) => {
            state.complimentory.status = 2
            state.complimentory.message = "Error"
            state.loading = false
        },
        // @ts-ignore
        [getcomplimentory.fulfilled]: (state, { payload }) => {
            state.complimentory.status = payload.success
            state.complimentory.message = payload.message
            state.complimentory.data = payload.data
            state.loading = false
        },

        // @ts-ignore
        [getcreditInsuranceBillCollection.pending]: (state, { payload }) => {
            state.creditInsuranceBillCollection.status = 0
            state.creditInsuranceBillCollection.message = "pending"
            state.loading = true
        },
        // @ts-ignore
        [getcreditInsuranceBillCollection.rejected]: (state, { payload }) => {
            state.creditInsuranceBillCollection.status = 2
            state.creditInsuranceBillCollection.message = "Error"
            state.loading = false
        },
        // @ts-ignore
        [getcreditInsuranceBillCollection.fulfilled]: (state, { payload }) => {
            state.creditInsuranceBillCollection.status = payload.success
            state.creditInsuranceBillCollection.message = payload.message
            state.creditInsuranceBillCollection.data = payload.data
            state.loading = false
        },

        // @ts-ignore
        [getIpconsolidatedDiscount.pending]: (state, { payload }) => {
            state.ipConsolidatedDiscount.status = 0
            state.ipConsolidatedDiscount.message = "pending"
            state.loading = true
        },
        // @ts-ignore
        [getIpconsolidatedDiscount.rejected]: (state, { payload }) => {
            state.ipConsolidatedDiscount.status = 2
            state.ipConsolidatedDiscount.message = "Error"
            state.loading = false
        },
        // @ts-ignore
        [getIpconsolidatedDiscount.fulfilled]: (state, { payload }) => {
            state.ipConsolidatedDiscount.status = payload.success
            state.ipConsolidatedDiscount.message = payload.message
            state.ipConsolidatedDiscount.data = payload.data
            state.loading = false
        },

        // @ts-ignore
        [getipPreviousDayDiscount.pending]: (state, { payload }) => {
            state.ipPreviousDayDiscount.status = 0
            state.ipPreviousDayDiscount.message = "pending"
            state.loading = true
        },
        // @ts-ignore
        [getipPreviousDayDiscount.rejected]: (state, { payload }) => {
            state.ipPreviousDayDiscount.status = 2
            state.ipPreviousDayDiscount.message = "Error"
            state.loading = false
        },
        // @ts-ignore
        [getipPreviousDayDiscount.fulfilled]: (state, { payload }) => {
            state.ipPreviousDayDiscount.status = payload.success
            state.ipPreviousDayDiscount.message = payload.message
            state.ipPreviousDayDiscount.data = payload.data
            state.loading = false
        },

        // @ts-ignore
        [getunsettledAmount.pending]: (state, { payload }) => {
            state.unsettledAmount.status = 0
            state.unsettledAmount.message = "pending"
            state.loading = true
        },
        // @ts-ignore
        [getunsettledAmount.rejected]: (state, { payload }) => {
            state.unsettledAmount.status = 2
            state.unsettledAmount.message = "Error"
            state.loading = false
        },
        // @ts-ignore
        [getunsettledAmount.fulfilled]: (state, { payload }) => {
            state.unsettledAmount.status = payload.success
            state.unsettledAmount.message = payload.message
            state.unsettledAmount.data = payload.data
            state.loading = false
        },
    }
})

export {
    getAdvanceCollection,
    getAdvanceRefund,
    getAdvanceSettled,
    getcollectionagainSaleTotal,
    getcollectionagainSaleDeduction,
    getcomplimentory,
    getcreditInsuranceBillCollection,
    getIpconsolidatedDiscount,
    getipPreviousDayDiscount,
    getunsettledAmount
}

export default collectionSlice.reducer;