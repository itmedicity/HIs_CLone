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
        const response = await axiosinstance.post(`/collectionTssh/${endPoint}`, postData);
        return response.data;
      } catch (error) {
        return rejectWithValue(error?.response?.data || "Network Error");
      }
    },
    {
      // prevents duplicate calls to the API when a request is already pending
      condition: (_, {getState}) => {
        const state = getState().collectionTssh[stateKey];
        // console.log("Condition check:", state?.status);
        if (state?.status === 1) return false;
      },
    },
  );

export const getAdvanceCollectionTssh = createApiThunk("advanceCollectionTssh", "advanceCollection", "advanceCollection");
export const getAdvanceRefundTssh = createApiThunk("advanceRefundTssh", "advanceRefund", "advanceRefund");
export const getAdvanceSettledTssh = createApiThunk("advanceSettledTssh", "advanceSettled", "advanceSettled");
export const getcollectionagainSaleTotalTssh = createApiThunk("collectionagainSaleTotalTssh", "collectionagainSaleTotal", "collectionagainSaleTotal");
export const getcollectionagainSaleDeductionTssh = createApiThunk("collectionagainSaleDeductionTssh", "collectionagainSaleDeduction", "collectionagainSaleDeduction");
export const getcomplimentoryTssh = createApiThunk("complimentoryTssh", "complimentory", "complimentory");
export const getcreditInsuranceBillCollectionTssh = createApiThunk("creditInsuranceBillCollectionTssh", "creditInsuranceBillCollection", "creditInsuranceBillCollection");
export const getIpconsolidatedDiscountTssh = createApiThunk("ipConsolidatedDiscountTssh", "ipConsolidatedDiscount", "ipConsolidatedDiscount");
export const getipPreviousDayDiscountTssh = createApiThunk("ipPreviousDayDiscountTssh", "ipPreviousDayDiscount", "ipPreviousDayDiscount");
export const getunsettledAmountTssh = createApiThunk("unsettledAmountTssh", "unsettledAmount", "unsettledAmount");
export const getipPreviousDayCollectionTssh = createApiThunk("ippreviousDayCollectionTssh", "ipPreviousDayCollection", "ipPreviousDayCollection");
export const getipcreditInsuranceBillTssh = createApiThunk("creditInsuranceBillTssh", "creditInsuranceBill", "creditInsuranceBill");
export const getipcreditInsuranceBillPending = createApiThunk("creditInsuranceBillPendingTssh", "creditInsuranceBillRefundTssh", "creditInsuranceBillRefundTssh");

const createInitialState = () => ({
  data: [],
  status: 0,
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

const collectionTsshSlice = createSlice({
  name: "incomeDataTssh",
  initialState,
  reducers: {
    resetColectionTsshState: () => initialState,
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

    addCases(getAdvanceCollectionTssh, "advanceCollection");
    addCases(getAdvanceRefundTssh, "advanceRefund");
    addCases(getAdvanceSettledTssh, "advanceSettled");
    addCases(getcollectionagainSaleTotalTssh, "collectionagainSaleTotal");
    addCases(getcollectionagainSaleDeductionTssh, "collectionagainSaleDeduction");
    addCases(getcomplimentoryTssh, "complimentory");
    addCases(getcreditInsuranceBillCollectionTssh, "creditInsuranceBillCollection");
    addCases(getIpconsolidatedDiscountTssh, "ipConsolidatedDiscount");
    addCases(getipPreviousDayDiscountTssh, "ipPreviousDayDiscount");
    addCases(getunsettledAmountTssh, "unsettledAmount");
    addCases(getipPreviousDayCollectionTssh, "ipPreviousDayCollection");
    addCases(getipcreditInsuranceBillTssh, "creditInsuranceBill");
    addCases(getipcreditInsuranceBillPending, "creditInsuranceBillRefundTssh");
  },
});

export const {resetColectionTsshState} = collectionTsshSlice.actions;
export default collectionTsshSlice.reducer;

// const createApiThunk = (actionName, endPoint) =>
//   createAsyncThunk(`api/${actionName}`, async (postData, {rejectWithValue}) => {
//     if (!postData || typeof postData !== "object") {
//       return rejectWithValue("Invalid Data");
//     }

//     try {
//       const response = await axiosinstance.post(`/collectionTssh/${endPoint}`, postData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data || "Network Error");
//     }
//   });

// const handleAsyncCases = (builder, thunk, stateKey) => {
//   builder
//     .addCase(thunk.pending, (state) => {
//       state[stateKey].status = 0;
//       state[stateKey].message = "pending";
//       state.loading = true;
//     })
//     .addCase(thunk.rejected, (state) => {
//       state[stateKey].status = 2;
//       state[stateKey].message = "Error";
//       state.loading = false;
//     })
//     .addCase(thunk.fulfilled, (state, {payload}) => {
//       state[stateKey].status = payload.success;
//       state[stateKey].message = payload.message;
//       state.loading = false;
//       state[stateKey].data = payload.data;
//     });
// };

// handleAsyncCases(builder, getAdvanceCollectionTssh, "advanceCollection");
// handleAsyncCases(builder, getAdvanceRefundTssh, "advanceRefund");
// handleAsyncCases(builder, getAdvanceSettledTssh, "advanceSettled");
// handleAsyncCases(builder, getcollectionagainSaleTotalTssh, "collectionAgainstSalesTotal");
// handleAsyncCases(builder, getcollectionagainSaleDeductionTssh, "collectionAgainstSalesDeduction");
// handleAsyncCases(builder, getcomplimentoryTssh, "complimentory");
// handleAsyncCases(builder, getcreditInsuranceBillCollectionTssh, "creditInsuranceBillCollection");
// handleAsyncCases(builder, getIpconsolidatedDiscountTssh, "ipConsolidatedDiscount");
// handleAsyncCases(builder, getipPreviousDayDiscountTssh, "ipPreviousDayDiscount");
// handleAsyncCases(builder, getunsettledAmountTssh, "unsettledAmount");
// handleAsyncCases(builder, getipPreviousDayCollectionTssh, "ippreviousDayCollection");
// handleAsyncCases(builder, getipcreditInsuranceBillTssh, "creditInsuranceBill");
// handleAsyncCases(builder, getipcreditInsuranceBillPending, "creditInsuranceBillPending");
