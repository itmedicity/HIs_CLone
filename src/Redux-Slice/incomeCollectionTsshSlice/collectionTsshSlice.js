import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosinstance } from '../../controllers/AxiosConfig'

//ADVANCE COLLECTION
const getAdvanceCollectionTssh = createAsyncThunk('api/advanceCollectionTssh', (postData) => {
    return axiosinstance.post("/collectionTssh/advanceCollection", postData)
        .then((response) => {
            return response.data;
        })
})
//ADVANCE REFUND
const getAdvanceRefundTssh = createAsyncThunk('api/advanceRefundTssh', (postData) => {
    return axiosinstance.post("/collectionTssh/advanceRefund", postData)
        .then((response) => {
            return response.data;
        })
})
//ADVANCE SETTLED
const getAdvanceSettledTssh = createAsyncThunk('api/advanceSettledTssh', (postData) => {
    return axiosinstance.post("/collectionTssh/advanceSettled", postData)
        .then((response) => {
            return response.data;
        })
})
//COLLECTION AGAINST SALE TOTAL
const getcollectionagainSaleTotalTssh = createAsyncThunk('api/collectionagainSaleTotalTssh', (postData) => {
    return axiosinstance.post("/collectionTssh/collectionagainSaleTotal", postData)
        .then((response) => {
            return response.data;
        })
})
//COLLECTION AGAINST SALE DEDUCTION
const getcollectionagainSaleDeductionTssh = createAsyncThunk('api/collectionagainSaleDeductionTssh', (postData) => {
    return axiosinstance.post("/collectionTssh/collectionagainSaleDeduction", postData)
        .then((response) => {
            return response.data;
        })
})
//COMPLIMENTORY
const getcomplimentoryTssh = createAsyncThunk('api/complimentoryTssh', (postData) => {
    return axiosinstance.post("/collectionTssh/complimentory", postData)
        .then((response) => {
            return response.data;
        })
})
//CREDIT INSURANCE BILL COLLECTION
const getcreditInsuranceBillCollectionTssh = createAsyncThunk('api/creditInsuranceBillCollectionTssh', (postData) => {
    return axiosinstance.post("/collectionTssh/creditInsuranceBillCollection", postData)
        .then((response) => {
            return response.data;
        })
})
//IP CONSOLIDATED DISCOUNT
const getIpconsolidatedDiscountTssh = createAsyncThunk('api/ipConsolidatedDiscountTssh', (postData) => {
    return axiosinstance.post("/collectionTssh/ipConsolidatedDiscount", postData)
        .then((response) => {
            return response.data;
        })
})
//IP PREVIOUS DAY DISCOUNT
const getipPreviousDayDiscountTssh = createAsyncThunk('api/ipPreviousDayDiscountTssh', (postData) => {
    return axiosinstance.post("/collectionTssh/ipPreviousDayDiscount", postData)
        .then((response) => {
            return response.data;
        })
})
//UNSETTLED
const getunsettledAmountTssh = createAsyncThunk('api/unsettledAmountTssh', (postData) => {
    return axiosinstance.post("/collectionTssh/unsettledAmount", postData)
        .then((response) => {
            return response.data;
        })
})
//IP PREVIOUS DAY COLLECTION
const getipPreviousDayCollectionTssh = createAsyncThunk('api/ippreviousDayCollectionTssh', (postData) => {
    return axiosinstance.post("/collectionTssh/ipPreviousDayCollection", postData)
        .then((response) => {
            return response.data;
        })
})
//CREDIT INSURANCE BILL
const getipcreditInsuranceBillTssh = createAsyncThunk('api/creditInsuranceBillTssh', (postData) => {
    return axiosinstance.post("/collectionTssh/creditInsuranceBill", postData)
        .then((response) => {
            return response.data;
        })
})

//CREDIT INSURANCE PENDING BILL
const getipcreditInsuranceBillPending = createAsyncThunk('api/creditInsuranceBillPendingTssh', (postData) => {
    return axiosinstance.post("/collectionTssh/creditInsuranceBillRefundTssh", postData)
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
    ippreviousDayCollection: {
        data: [],
        status: 0,
        message: "",
    },
    creditInsuranceBill: {
        data: [],
        status: 0,
        message: "",
    },
    creditInsuranceBillPending: {
        data: [],
        status: 0,
        message: "",
    },
    loading: true
}

const collectionTsshSlice = createSlice({
    name: "incomeDataTssh",
    initialState,
    reducers: {},
    extraReducers: {
        //Advance Collection
        // @ts-ignore
        [getAdvanceCollectionTssh.pending]: (state, { payload }) => {
            state.advanceCollection.status = 0
            state.advanceCollection.message = "pending"
            state.loading = true
        },
        // @ts-ignore
        [getAdvanceCollectionTssh.rejected]: (state, { payload }) => {
            state.advanceCollection.status = 2
            state.advanceCollection.message = "Error"
            state.loading = false
        },
        // @ts-ignore
        [getAdvanceCollectionTssh.fulfilled]: (state, { payload }) => {
            state.advanceCollection.status = payload.success
            state.advanceCollection.message = payload.message
            state.loading = false
            state.advanceCollection.data = payload.data
        },
        //AdvanceRefund
        // @ts-ignore
        [getAdvanceRefundTssh.pending]: (state, { payload }) => {
            state.advanceRefund.status = 0
            state.advanceRefund.message = "pending"
            state.loading = true
        },
        // @ts-ignore
        [getAdvanceRefundTssh.rejected]: (state, { payload }) => {
            state.advanceRefund.status = 2
            state.advanceRefund.message = "Error"
            state.loading = false
        },
        // @ts-ignore
        [getAdvanceRefundTssh.fulfilled]: (state, { payload }) => {
            state.advanceRefund.status = payload.success
            state.advanceRefund.message = payload.message
            state.advanceRefund.data = payload.data
            state.loading = false
        },
        // @ts-ignore
        [getAdvanceSettledTssh.pending]: (state, { payload }) => {
            state.advanceSettled.status = 0
            state.advanceSettled.message = "pending"
            state.loading = true
        },
        // @ts-ignore
        [getAdvanceSettledTssh.rejected]: (state, { payload }) => {
            state.advanceSettled.status = 2
            state.advanceSettled.message = "Error"
            state.loading = false
        },
        // @ts-ignore
        [getAdvanceSettledTssh.fulfilled]: (state, { payload }) => {
            state.advanceSettled.status = payload.success
            state.advanceSettled.message = payload.message
            state.advanceSettled.data = payload.data
            state.loading = false
        },

        // @ts-ignore
        [getcollectionagainSaleTotalTssh.pending]: (state, { payload }) => {
            state.collectionAgainstSalesTotal.status = 0
            state.collectionAgainstSalesTotal.message = "pending"
            state.loading = true
        },
        // @ts-ignore
        [getcollectionagainSaleTotalTssh.rejected]: (state, { payload }) => {
            state.collectionAgainstSalesTotal.status = 2
            state.collectionAgainstSalesTotal.message = "Error"
            state.loading = false
        },
        // @ts-ignore
        [getcollectionagainSaleTotalTssh.fulfilled]: (state, { payload }) => {
            state.collectionAgainstSalesTotal.status = payload.success
            state.collectionAgainstSalesTotal.message = payload.message
            state.collectionAgainstSalesTotal.data = payload.data
            state.loading = false
        },

        // @ts-ignore
        [getcollectionagainSaleDeductionTssh.pending]: (state, { payload }) => {
            state.collectionAgainstSalesDeduction.status = 0
            state.collectionAgainstSalesDeduction.message = "pending"
            state.loading = true
        },
        // @ts-ignore
        [getcollectionagainSaleDeductionTssh.rejected]: (state, { payload }) => {
            state.collectionAgainstSalesDeduction.status = 2
            state.collectionAgainstSalesDeduction.message = "Error"
            state.loading = false
        },
        // @ts-ignore
        [getcollectionagainSaleDeductionTssh.fulfilled]: (state, { payload }) => {
            state.collectionAgainstSalesDeduction.status = payload.success
            state.collectionAgainstSalesDeduction.message = payload.message
            state.collectionAgainstSalesDeduction.data = payload.data
            state.loading = false
        },

        // @ts-ignore
        [getcomplimentoryTssh.pending]: (state, { payload }) => {
            state.complimentory.status = 0
            state.complimentory.message = "pending"
            state.loading = true
        },
        // @ts-ignore
        [getcomplimentoryTssh.rejected]: (state, { payload }) => {
            state.complimentory.status = 2
            state.complimentory.message = "Error"
            state.loading = false
        },
        // @ts-ignore
        [getcomplimentoryTssh.fulfilled]: (state, { payload }) => {
            state.complimentory.status = payload.success
            state.complimentory.message = payload.message
            state.complimentory.data = payload.data
            state.loading = false
        },

        // @ts-ignore
        [getcreditInsuranceBillCollectionTssh.pending]: (state, { payload }) => {
            state.creditInsuranceBillCollection.status = 0
            state.creditInsuranceBillCollection.message = "pending"
            state.loading = true
        },
        // @ts-ignore
        [getcreditInsuranceBillCollectionTssh.rejected]: (state, { payload }) => {
            state.creditInsuranceBillCollection.status = 2
            state.creditInsuranceBillCollection.message = "Error"
            state.loading = false
        },
        // @ts-ignore
        [getcreditInsuranceBillCollectionTssh.fulfilled]: (state, { payload }) => {
            state.creditInsuranceBillCollection.status = payload.success
            state.creditInsuranceBillCollection.message = payload.message
            state.creditInsuranceBillCollection.data = payload.data
            state.loading = false
        },

        // @ts-ignore
        [getIpconsolidatedDiscountTssh.pending]: (state, { payload }) => {
            state.ipConsolidatedDiscount.status = 0
            state.ipConsolidatedDiscount.message = "pending"
            state.loading = true
        },
        // @ts-ignore
        [getIpconsolidatedDiscountTssh.rejected]: (state, { payload }) => {
            state.ipConsolidatedDiscount.status = 2
            state.ipConsolidatedDiscount.message = "Error"
            state.loading = false
        },
        // @ts-ignore
        [getIpconsolidatedDiscountTssh.fulfilled]: (state, { payload }) => {
            state.ipConsolidatedDiscount.status = payload.success
            state.ipConsolidatedDiscount.message = payload.message
            state.ipConsolidatedDiscount.data = payload.data
            state.loading = false
        },

        // @ts-ignore
        [getipPreviousDayDiscountTssh.pending]: (state, { payload }) => {
            state.ipPreviousDayDiscount.status = 0
            state.ipPreviousDayDiscount.message = "pending"
            state.loading = true
        },
        // @ts-ignore
        [getipPreviousDayDiscountTssh.rejected]: (state, { payload }) => {
            state.ipPreviousDayDiscount.status = 2
            state.ipPreviousDayDiscount.message = "Error"
            state.loading = false
        },
        // @ts-ignore
        [getipPreviousDayDiscountTssh.fulfilled]: (state, { payload }) => {
            state.ipPreviousDayDiscount.status = payload.success
            state.ipPreviousDayDiscount.message = payload.message
            state.ipPreviousDayDiscount.data = payload.data
            state.loading = false
        },

        // @ts-ignore
        [getunsettledAmountTssh.pending]: (state, { payload }) => {
            state.unsettledAmount.status = 0
            state.unsettledAmount.message = "pending"
            state.loading = true
        },
        // @ts-ignore
        [getunsettledAmountTssh.rejected]: (state, { payload }) => {
            state.unsettledAmount.status = 2
            state.unsettledAmount.message = "Error"
            state.loading = false
        },
        // @ts-ignore
        [getunsettledAmountTssh.fulfilled]: (state, { payload }) => {
            state.unsettledAmount.status = payload.success
            state.unsettledAmount.message = payload.message
            state.unsettledAmount.data = payload.data
            state.loading = false
        },

        // @ts-ignore
        [getipPreviousDayCollectionTssh.pending]: (state, { payload }) => {
            state.ippreviousDayCollection.status = 0
            state.ippreviousDayCollection.message = "pending"
            state.loading = true
        },
        // @ts-ignore
        [getipPreviousDayCollectionTssh.rejected]: (state, { payload }) => {
            state.ippreviousDayCollection.status = 2
            state.ippreviousDayCollection.message = "Error"
            state.loading = false
        },
        // @ts-ignore
        [getipPreviousDayCollectionTssh.fulfilled]: (state, { payload }) => {
            state.ippreviousDayCollection.status = payload.success
            state.ippreviousDayCollection.message = payload.message
            state.ippreviousDayCollection.data = payload.data
            state.loading = false
        },

        // @ts-ignore
        [getipcreditInsuranceBillTssh.pending]: (state, { payload }) => {
            state.creditInsuranceBill.status = 0
            state.creditInsuranceBill.message = "pending"
            state.loading = true
        },
        // @ts-ignore
        [getipcreditInsuranceBillTssh.rejected]: (state, { payload }) => {
            state.creditInsuranceBill.status = 2
            state.creditInsuranceBill.message = "Error"
            state.loading = false
        },
        // @ts-ignore
        [getipcreditInsuranceBillTssh.fulfilled]: (state, { payload }) => {
            state.creditInsuranceBill.status = payload.success
            state.creditInsuranceBill.message = payload.message
            state.creditInsuranceBill.data = payload.data
            state.loading = false
        },
        // @ts-ignore
        [getipcreditInsuranceBillPending.pending]: (state, { payload }) => {
            state.creditInsuranceBillPending.status = 0
            state.creditInsuranceBillPending.message = "pending"
            state.loading = true
        },
        // @ts-ignore
        [getipcreditInsuranceBillPending.rejected]: (state, { payload }) => {
            state.creditInsuranceBillPending.status = 2
            state.creditInsuranceBillPending.message = "Error"
            state.loading = false
        },
        // @ts-ignore
        [getipcreditInsuranceBillPending.fulfilled]: (state, { payload }) => {
            state.creditInsuranceBillPending.status = payload.success
            state.creditInsuranceBillPending.message = payload.message
            state.creditInsuranceBillPending.data = payload.data
            state.loading = false
        },
    }
})

export {
    getAdvanceCollectionTssh,
    getAdvanceRefundTssh,
    getAdvanceSettledTssh,
    getcollectionagainSaleTotalTssh,
    getcollectionagainSaleDeductionTssh,
    getcomplimentoryTssh,
    getcreditInsuranceBillCollectionTssh,
    getIpconsolidatedDiscountTssh,
    getipPreviousDayDiscountTssh,
    getunsettledAmountTssh,
    getipPreviousDayCollectionTssh,
    getipcreditInsuranceBillTssh,
    getipcreditInsuranceBillPending
}

export default collectionTsshSlice.reducer;