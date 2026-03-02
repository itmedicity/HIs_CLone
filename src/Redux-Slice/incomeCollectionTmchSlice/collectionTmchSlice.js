import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {axiosinstance} from "../../controllers/AxiosConfig";

const createApiThunk = (actionName, endPoint, stateKey) =>
  createAsyncThunk(
    `api/${actionName}`,
    async (postData, {rejectWithValue}) => {
      if (!postData || typeof postData !== "object") {
        return rejectWithValue("Invalid Data");
      }

      try {
        const response = await axiosinstance.post(`/collectionTmch/${endPoint}`, postData);
        return response.data;
      } catch (error) {
        return rejectWithValue(error?.response?.data || "Network Error");
      }
    },
    {
      // prevents duplicate call if already successful
      condition: (_, {getState}) => {
        const state = getState().collectionTmch[stateKey];
        if (state?.status === 1) return false;
      },
    },
  );

export const getAdvanceCollectionTmch = createApiThunk("advanceCollectionTmch", "advanceCollection", "collectionTmch");
export const getAdvanceRefundTmch = createApiThunk("advanceRefundTmch", "advanceRefund", "advanceRefund");
export const getAdvanceSettledTmch = createApiThunk("advanceSettledTmch", "advanceSettled", "advanceSettled");
export const getcollectionagainSaleTotalTmch = createApiThunk("collectionagainSaleTotalTmch", "collectionagainSaleTotal", "collectionagainSale");
export const getcollectionagainSaleDeductionTmch = createApiThunk("collectionagainSaleDeductionTmch", "collectionagainSaleDeduction", "collectionDeduction");
export const getcomplimentoryTmch = createApiThunk("complimentoryTmch", "complimentory", "complimentory");
export const getcreditInsuranceBillCollectionTmch = createApiThunk("creditInsuranceBillCollectionTmch", "creditInsuranceBillCollection", "creditInsuranceBillCollection");
export const getIpconsolidatedDiscountTmch = createApiThunk("ipConsolidatedDiscountTmch", "ipConsolidatedDiscount", "ipConsolidatedDiscount");
export const getipPreviousDayDiscountTmch = createApiThunk("ipPreviousDayDiscountTmch", "ipPreviousDayDiscount", "ipPreviousDayDiscount");
export const getunsettledAmountTmch = createApiThunk("unsettledAmountTmch", "unsettledAmount", "unsettledAmount");
export const getipPreviousDayCollectionTmch = createApiThunk("ippreviousDayCollectionTmch", "ipPreviousDayCollection", "ippreviousDayCollection");
export const getipcreditInsuranceBillTmch = createApiThunk("creditInsuranceBillTmch", "creditInsuranceBill", "creditInsuranceBill");
export const getipcreditInsuranceBillPending = createApiThunk("creditInsuranceBillPendingTmch", "creditInsuranceBillRefundTmch", "creditInsuranceBillPending");

//ADVANCE COLLECTION
// const getAdvanceCollectionTmch = createAsyncThunk('api/advanceCollectionTmch', (postData) => {
//     return axiosinstance.post("/collectionTmch/advanceCollection", postData)
//         .then((response) => {
//             return response.data;
//         })
// })
//ADVANCE REFUND
// const getAdvanceRefundTmch = createAsyncThunk('api/advanceRefundTmch', (postData) => {
//     return axiosinstance.post("/collectionTmch/advanceRefund", postData)
//         .then((response) => {
//             return response.data;
//         })
// })
//ADVANCE SETTLED
// const getAdvanceSettledTmch = createAsyncThunk('api/advanceSettledTmch', (postData) => {
//     return axiosinstance.post("/collectionTmch/advanceSettled", postData)
//         .then((response) => {
//             return response.data;
//         })
// })
//COLLECTION AGAINST SALE TOTAL
// const getcollectionagainSaleTotalTmch = createAsyncThunk("api/collectionagainSaleTotalTmch", (postData) => {
//   return axiosinstance.post("/collectionTmch/collectionagainSaleTotal", postData).then((response) => {
//     return response.data;
//   });
// });
//COLLECTION AGAINST SALE DEDUCTION
// const getcollectionagainSaleDeductionTmch = createAsyncThunk("api/collectionagainSaleDeductionTmch", (postData) => {
//   return axiosinstance.post("/collectionTmch/collectionagainSaleDeduction", postData).then((response) => {
//     return response.data;
//   });
// });

//COMPLIMENTORY
// const getcomplimentoryTmch = createAsyncThunk("api/complimentoryTmch", (postData) => {
//   return axiosinstance.post("/collectionTmch/complimentory", postData).then((response) => {
//     return response.data;
//   });
// });
//CREDIT INSURANCE BILL COLLECTION
// const getcreditInsuranceBillCollectionTmch = createAsyncThunk("api/creditInsuranceBillCollectionTmch", (postData) => {
//   return axiosinstance.post("/collectionTmch/creditInsuranceBillCollection", postData).then((response) => {
//     return response.data;
//   });
// });

//IP CONSOLIDATED DISCOUNT
// const getIpconsolidatedDiscountTmch = createAsyncThunk("api/ipConsolidatedDiscountTmch", (postData) => {
//   return axiosinstance.post("/collectionTmch/ipConsolidatedDiscount", postData).then((response) => {
//     return response.data;
//   });
// });
//IP PREVIOUS DAY DISCOUNT
// const getipPreviousDayDiscountTmch = createAsyncThunk("api/ipPreviousDayDiscountTmch", (postData) => {
//   return axiosinstance.post("/collectionTmch/ipPreviousDayDiscount", postData).then((response) => {
//     return response.data;
//   });
// });
//UNSETTLED
// const getunsettledAmountTmch = createAsyncThunk("api/unsettledAmountTmch", (postData) => {
//   return axiosinstance.post("/collectionTmch/unsettledAmount", postData).then((response) => {
//     return response.data;
//   });
// });
//IP PREVIOUS DAY COLLECTION
// const getipPreviousDayCollectionTmch = createAsyncThunk("api/ippreviousDayCollectionTmch", (postData) => {
//   return axiosinstance.post("/collectionTmch/ipPreviousDayCollection", postData).then((response) => {
//     return response.data;
//   });
// });

//CREDIT INSURANCE BILL
// const getipcreditInsuranceBillTmch = createAsyncThunk("api/creditInsuranceBillTmch", (postData) => {
//   return axiosinstance.post("/collectionTmch/creditInsuranceBill", postData).then((response) => {
//     return response.data;
//   });
// });

//CREDIT INSURANCE PENDING BILL
// const getipcreditInsuranceBillPending = createAsyncThunk("api/creditInsuranceBillPendingTmch", (postData) => {
//   return axiosinstance.post("/collectionTmch/creditInsuranceBillRefundTmch", postData).then((response) => {
//     return response.data;
//   });
// });
const createInitialState = () => ({
  data: [],
  status: 0, // 0=pending, 1=success, 2=error
  message: "",
});

const initialState = {
  advanceCollection: createInitialState(),
  advanceRefund: createInitialState(),
  advanceSettled: createInitialState(),
  collectionAgainstSalesTotal: createInitialState(),
  collectionAgainstSalesDeduction: createInitialState(),
  complimentory: createInitialState(),
  creditInsuranceBillCollection: createInitialState(),
  ipConsolidatedDiscount: createInitialState(),
  ipPreviousDayDiscount: createInitialState(),
  unsettledAmount: createInitialState(),
  ippreviousDayCollection: createInitialState(),
  creditInsuranceBill: createInitialState(),
  creditInsuranceBillPending: createInitialState(),
};

const collectionTmchSlice = createSlice({
  name: "incomeDataTmch",
  initialState,
  reducers: {
    resetCollectionTmchState: () => initialState,
  },
  extraReducers: (builder) => {
    const addCases = (thunk, key) => {
      builder
        .addCase(thunk.pending, (state) => {
          state[key].status = 0;
          state[key].message = "pending";
        })
        .addCase(thunk.fulfilled, (state, {payload}) => {
          state[key].status = payload?.success ?? 2;
          state[key].message = payload?.message ?? "";
          state[key].data = payload?.data ?? [];
        })
        .addCase(thunk.rejected, (state, action) => {
          state[key].status = 2;
          state[key].message = action.payload || "Error";
        });
    };

    addCases(getAdvanceCollectionTmch, "collectionTmch");
    addCases(getAdvanceRefundTmch, "advanceRefund");
    addCases(getAdvanceSettledTmch, "advanceSettled");
    addCases(getcollectionagainSaleTotalTmch, "collectionagainSale");
    addCases(getcollectionagainSaleDeductionTmch, "collectionDeduction");
    addCases(getcomplimentoryTmch, "complimentory");
    addCases(getcreditInsuranceBillCollectionTmch, "creditInsuranceBillCollection");
    addCases(getIpconsolidatedDiscountTmch, "ipConsolidatedDiscount");
    addCases(getipPreviousDayDiscountTmch, "ipPreviousDayDiscount");
    addCases(getunsettledAmountTmch, "unsettledAmount");
    addCases(getipPreviousDayCollectionTmch, "ippreviousDayCollection");
    addCases(getipcreditInsuranceBillTmch, "creditInsuranceBill");
    addCases(getipcreditInsuranceBillPending, "creditInsuranceBillPending");
  },
  //   extraReducers: {
  //     //Advance Collection
  //     // @ts-ignore
  //     [getAdvanceCollectionTmch.pending]: (state, {payload}) => {
  //       state.advanceCollection.status = 0;
  //       state.advanceCollection.message = "pending";
  //       state.loading = true;
  //     },
  //     // @ts-ignore
  //     [getAdvanceCollectionTmch.rejected]: (state, {payload}) => {
  //       state.advanceCollection.status = 2;
  //       state.advanceCollection.message = "Error";
  //       state.loading = false;
  //     },
  //     // @ts-ignore
  //     [getAdvanceCollectionTmch.fulfilled]: (state, {payload}) => {
  //       state.advanceCollection.status = payload.success;
  //       state.advanceCollection.message = payload.message;
  //       state.loading = false;
  //       state.advanceCollection.data = payload.data;
  //     },
  //     //AdvanceRefund
  //     // @ts-ignore
  //     [getAdvanceRefundTmch.pending]: (state, {payload}) => {
  //       state.advanceRefund.status = 0;
  //       state.advanceRefund.message = "pending";
  //       state.loading = true;
  //     },
  //     // @ts-ignore
  //     [getAdvanceRefundTmch.rejected]: (state, {payload}) => {
  //       state.advanceRefund.status = 2;
  //       state.advanceRefund.message = "Error";
  //       state.loading = false;
  //     },
  //     // @ts-ignore
  //     [getAdvanceRefundTmch.fulfilled]: (state, {payload}) => {
  //       state.advanceRefund.status = payload.success;
  //       state.advanceRefund.message = payload.message;
  //       state.advanceRefund.data = payload.data;
  //       state.loading = false;
  //     },
  //     // @ts-ignore
  //     [getAdvanceSettledTmch.pending]: (state, {payload}) => {
  //       state.advanceSettled.status = 0;
  //       state.advanceSettled.message = "pending";
  //       state.loading = true;
  //     },
  //     // @ts-ignore
  //     [getAdvanceSettledTmch.rejected]: (state, {payload}) => {
  //       state.advanceSettled.status = 2;
  //       state.advanceSettled.message = "Error";
  //       state.loading = false;
  //     },
  //     // @ts-ignore
  //     [getAdvanceSettledTmch.fulfilled]: (state, {payload}) => {
  //       state.advanceSettled.status = payload.success;
  //       state.advanceSettled.message = payload.message;
  //       state.advanceSettled.data = payload.data;
  //       state.loading = false;
  //     },

  //     // @ts-ignore
  //     [getcollectionagainSaleTotalTmch.pending]: (state, {payload}) => {
  //       state.collectionAgainstSalesTotal.status = 0;
  //       state.collectionAgainstSalesTotal.message = "pending";
  //       state.loading = true;
  //     },
  //     // @ts-ignore
  //     [getcollectionagainSaleTotalTmch.rejected]: (state, {payload}) => {
  //       state.collectionAgainstSalesTotal.status = 2;
  //       state.collectionAgainstSalesTotal.message = "Error";
  //       state.loading = false;
  //     },
  //     // @ts-ignore
  //     [getcollectionagainSaleTotalTmch.fulfilled]: (state, {payload}) => {
  //       state.collectionAgainstSalesTotal.status = payload.success;
  //       state.collectionAgainstSalesTotal.message = payload.message;
  //       state.collectionAgainstSalesTotal.data = payload.data;
  //       state.loading = false;
  //     },

  //     // @ts-ignore
  //     [getcollectionagainSaleDeductionTmch.pending]: (state, {payload}) => {
  //       state.collectionAgainstSalesDeduction.status = 0;
  //       state.collectionAgainstSalesDeduction.message = "pending";
  //       state.loading = true;
  //     },
  //     // @ts-ignore
  //     [getcollectionagainSaleDeductionTmch.rejected]: (state, {payload}) => {
  //       state.collectionAgainstSalesDeduction.status = 2;
  //       state.collectionAgainstSalesDeduction.message = "Error";
  //       state.loading = false;
  //     },
  //     // @ts-ignore
  //     [getcollectionagainSaleDeductionTmch.fulfilled]: (state, {payload}) => {
  //       state.collectionAgainstSalesDeduction.status = payload.success;
  //       state.collectionAgainstSalesDeduction.message = payload.message;
  //       state.collectionAgainstSalesDeduction.data = payload.data;
  //       state.loading = false;
  //     },

  //     // @ts-ignore
  //     [getcomplimentoryTmch.pending]: (state, {payload}) => {
  //       state.complimentory.status = 0;
  //       state.complimentory.message = "pending";
  //       state.loading = true;
  //     },
  //     // @ts-ignore
  //     [getcomplimentoryTmch.rejected]: (state, {payload}) => {
  //       state.complimentory.status = 2;
  //       state.complimentory.message = "Error";
  //       state.loading = false;
  //     },
  //     // @ts-ignore
  //     [getcomplimentoryTmch.fulfilled]: (state, {payload}) => {
  //       state.complimentory.status = payload.success;
  //       state.complimentory.message = payload.message;
  //       state.complimentory.data = payload.data;
  //       state.loading = false;
  //     },

  //     // @ts-ignore
  //     [getcreditInsuranceBillCollectionTmch.pending]: (state, {payload}) => {
  //       state.creditInsuranceBillCollection.status = 0;
  //       state.creditInsuranceBillCollection.message = "pending";
  //       state.loading = true;
  //     },
  //     // @ts-ignore
  //     [getcreditInsuranceBillCollectionTmch.rejected]: (state, {payload}) => {
  //       state.creditInsuranceBillCollection.status = 2;
  //       state.creditInsuranceBillCollection.message = "Error";
  //       state.loading = false;
  //     },
  //     // @ts-ignore
  //     [getcreditInsuranceBillCollectionTmch.fulfilled]: (state, {payload}) => {
  //       state.creditInsuranceBillCollection.status = payload.success;
  //       state.creditInsuranceBillCollection.message = payload.message;
  //       state.creditInsuranceBillCollection.data = payload.data;
  //       state.loading = false;
  //     },

  //     // @ts-ignore
  //     [getIpconsolidatedDiscountTmch.pending]: (state, {payload}) => {
  //       state.ipConsolidatedDiscount.status = 0;
  //       state.ipConsolidatedDiscount.message = "pending";
  //       state.loading = true;
  //     },
  //     // @ts-ignore
  //     [getIpconsolidatedDiscountTmch.rejected]: (state, {payload}) => {
  //       state.ipConsolidatedDiscount.status = 2;
  //       state.ipConsolidatedDiscount.message = "Error";
  //       state.loading = false;
  //     },
  //     // @ts-ignore
  //     [getIpconsolidatedDiscountTmch.fulfilled]: (state, {payload}) => {
  //       state.ipConsolidatedDiscount.status = payload.success;
  //       state.ipConsolidatedDiscount.message = payload.message;
  //       state.ipConsolidatedDiscount.data = payload.data;
  //       state.loading = false;
  //     },

  //     // @ts-ignore
  //     [getipPreviousDayDiscountTmch.pending]: (state, {payload}) => {
  //       state.ipPreviousDayDiscount.status = 0;
  //       state.ipPreviousDayDiscount.message = "pending";
  //       state.loading = true;
  //     },
  //     // @ts-ignore
  //     [getipPreviousDayDiscountTmch.rejected]: (state, {payload}) => {
  //       state.ipPreviousDayDiscount.status = 2;
  //       state.ipPreviousDayDiscount.message = "Error";
  //       state.loading = false;
  //     },
  //     // @ts-ignore
  //     [getipPreviousDayDiscountTmch.fulfilled]: (state, {payload}) => {
  //       state.ipPreviousDayDiscount.status = payload.success;
  //       state.ipPreviousDayDiscount.message = payload.message;
  //       state.ipPreviousDayDiscount.data = payload.data;
  //       state.loading = false;
  //     },

  //     // @ts-ignore
  //     [getunsettledAmountTmch.pending]: (state, {payload}) => {
  //       state.unsettledAmount.status = 0;
  //       state.unsettledAmount.message = "pending";
  //       state.loading = true;
  //     },
  //     // @ts-ignore
  //     [getunsettledAmountTmch.rejected]: (state, {payload}) => {
  //       state.unsettledAmount.status = 2;
  //       state.unsettledAmount.message = "Error";
  //       state.loading = false;
  //     },
  //     // @ts-ignore
  //     [getunsettledAmountTmch.fulfilled]: (state, {payload}) => {
  //       state.unsettledAmount.status = payload.success;
  //       state.unsettledAmount.message = payload.message;
  //       state.unsettledAmount.data = payload.data;
  //       state.loading = false;
  //     },

  //     // @ts-ignore
  //     [getipPreviousDayCollectionTmch.pending]: (state, {payload}) => {
  //       state.ippreviousDayCollection.status = 0;
  //       state.ippreviousDayCollection.message = "pending";
  //       state.loading = true;
  //     },
  //     // @ts-ignore
  //     [getipPreviousDayCollectionTmch.rejected]: (state, {payload}) => {
  //       state.ippreviousDayCollection.status = 2;
  //       state.ippreviousDayCollection.message = "Error";
  //       state.loading = false;
  //     },
  //     // @ts-ignore
  //     [getipPreviousDayCollectionTmch.fulfilled]: (state, {payload}) => {
  //       state.ippreviousDayCollection.status = payload.success;
  //       state.ippreviousDayCollection.message = payload.message;
  //       state.ippreviousDayCollection.data = payload.data;
  //       state.loading = false;
  //     },

  //     // @ts-ignore
  //     [getipcreditInsuranceBillTmch.pending]: (state, {payload}) => {
  //       state.creditInsuranceBill.status = 0;
  //       state.creditInsuranceBill.message = "pending";
  //       state.loading = true;
  //     },
  //     // @ts-ignore
  //     [getipcreditInsuranceBillTmch.rejected]: (state, {payload}) => {
  //       state.creditInsuranceBill.status = 2;
  //       state.creditInsuranceBill.message = "Error";
  //       state.loading = false;
  //     },
  //     // @ts-ignore
  //     [getipcreditInsuranceBillTmch.fulfilled]: (state, {payload}) => {
  //       state.creditInsuranceBill.status = payload.success;
  //       state.creditInsuranceBill.message = payload.message;
  //       state.creditInsuranceBill.data = payload.data;
  //       state.loading = false;
  //     },
  //     // @ts-ignore
  //     [getipcreditInsuranceBillPending.pending]: (state, {payload}) => {
  //       state.creditInsuranceBillPending.status = 0;
  //       state.creditInsuranceBillPending.message = "pending";
  //       state.loading = true;
  //     },
  //     // @ts-ignore
  //     [getipcreditInsuranceBillPending.rejected]: (state, {payload}) => {
  //       state.creditInsuranceBillPending.status = 2;
  //       state.creditInsuranceBillPending.message = "Error";
  //       state.loading = false;
  //     },
  //     // @ts-ignore
  //     [getipcreditInsuranceBillPending.fulfilled]: (state, {payload}) => {
  //       state.creditInsuranceBillPending.status = payload.success;
  //       state.creditInsuranceBillPending.message = payload.message;
  //       state.creditInsuranceBillPending.data = payload.data;
  //       state.loading = false;
  //     },
  //   },
});

// export {
//   getAdvanceCollectionTmch,
//   getAdvanceRefundTmch,
//   getAdvanceSettledTmch,
//   getcollectionagainSaleTotalTmch,
//   getcollectionagainSaleDeductionTmch,
//   getcomplimentoryTmch,
//   getcreditInsuranceBillCollectionTmch,
//   getIpconsolidatedDiscountTmch,
//   getipPreviousDayDiscountTmch,
//   getunsettledAmountTmch,
//   getipPreviousDayCollectionTmch,
//   getipcreditInsuranceBillTmch,
//   getipcreditInsuranceBillPending,
// };

export const {resetCollectionTmchState} = collectionTmchSlice.actions;
export default collectionTmchSlice.reducer;
