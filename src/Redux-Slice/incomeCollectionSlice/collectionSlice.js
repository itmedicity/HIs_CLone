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
        const response = await axiosinstance.post(`/collection/${endPoint}`, postData);
        return response.data;
      } catch (error) {
        return rejectWithValue(error?.response?.data || "Network Error");
      }
    },
    {
      // prevents duplicate calls to the API when a request is already pending
      condition: (_, {getState}) => {
        const state = getState().collection[stateKey];
        // console.log("Condition check:", state?.status);
        if (state?.status === 1) return false;
      },
    },
  );

export const getAdvanceCollection = createApiThunk("advanceCollection", "advanceCollection", "advanceCollection");
export const getAdvanceRefund = createApiThunk("advanceRefund", "advanceRefund", "advanceRefund");
export const getAdvanceSettled = createApiThunk("advanceSettled", "advanceSettled", "advanceSettled");
export const getcollectionagainSaleTotal = createApiThunk("collectionagainSaleTotal", "collectionagainSaleTotal", "collectionAgainstSalesTotal");
export const getcollectionagainSaleDeduction = createApiThunk("collectionagainSaleDeduction", "collectionagainSaleDeduction", "collectionAgainstSalesDeduction");
export const getcomplimentory = createApiThunk("complimentory", "complimentory", "complimentory");
export const getcreditInsuranceBillCollection = createApiThunk("creditInsuranceBillCollection", "creditInsuranceBillCollection", "creditInsuranceBillCollection");
export const getIpconsolidatedDiscount = createApiThunk("ipConsolidatedDiscount", "ipConsolidatedDiscount", "ipConsolidatedDiscount");
export const getipPreviousDayDiscount = createApiThunk("ipPreviousDayDiscount", "ipPreviousDayDiscount", "ipPreviousDayDiscount");
export const getunsettledAmount = createApiThunk("unsettledAmount", "unsettledAmount", "unsettledAmount");
export const getipPreviousDayCollection = createApiThunk("ippreviousDayCollection", "ipPreviousDayCollection", "ippreviousDayCollection");
export const getipcreditInsuranceBill = createApiThunk("creditInsuranceBill", "creditInsuranceBill", "creditInsuranceBill");
export const getipcreditInsuranceBillPending = createApiThunk("creditInsuranceBillPending", "creditInsuranceBillRefund", "creditInsuranceBillPending");

//  initital state
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

const collectionSlice = createSlice({
  name: "collectionQMT",
  initialState,
  reducers: {
    resetCollectionState: () => initialState,
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

    addCases(getAdvanceCollection, "advanceCollection");
    addCases(getAdvanceRefund, "advanceRefund");
    addCases(getAdvanceSettled, "advanceSettled");
    addCases(getcollectionagainSaleTotal, "collectionAgainstSalesTotal");
    addCases(getcollectionagainSaleDeduction, "collectionAgainstSalesDeduction");
    addCases(getcomplimentory, "complimentory");
    addCases(getcreditInsuranceBillCollection, "creditInsuranceBillCollection");
    addCases(getIpconsolidatedDiscount, "ipConsolidatedDiscount");
    addCases(getipPreviousDayDiscount, "ipPreviousDayDiscount");
    addCases(getunsettledAmount, "unsettledAmount");
    addCases(getipPreviousDayCollection, "ippreviousDayCollection");
    addCases(getipcreditInsuranceBill, "creditInsuranceBill");
    addCases(getipcreditInsuranceBillPending, "creditInsuranceBillPending");
  },
});

export const {resetCollectionState} = collectionSlice.actions;
export default collectionSlice.reducer;

// API thunk Cretator
// const createApiThunk = (actionName, endPoint) =>
//   createAsyncThunk(`api/${actionName}`, async (postData, {rejectWithValue}) => {
//     if (!postData || typeof postData !== "object") {
//       return rejectWithValue("Invalid Data");
//     }
//     try {
//       const response = await axiosinstance.post(`/collection/${endPoint}`, postData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data || "Network Error");
//     }
//   });

// slice
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

// handleAsyncCases(builder, getAdvanceCollection, "advanceCollection");
// handleAsyncCases(builder, getAdvanceRefund, "advanceRefund");
// handleAsyncCases(builder, getAdvanceSettled, "advanceSettled");
// handleAsyncCases(builder, getcollectionagainSaleTotal, "collectionAgainstSalesTotal");
// handleAsyncCases(builder, getcollectionagainSaleDeduction, "collectionAgainstSalesDeduction");
// handleAsyncCases(builder, getcomplimentory, "complimentory");
// handleAsyncCases(builder, getcreditInsuranceBillCollection, "creditInsuranceBillCollection");
// handleAsyncCases(builder, getIpconsolidatedDiscount, "ipConsolidatedDiscount");
// handleAsyncCases(builder, getipPreviousDayDiscount, "ipPreviousDayDiscount");
// handleAsyncCases(builder, getunsettledAmount, "unsettledAmount");
// handleAsyncCases(builder, getipPreviousDayCollection, "ippreviousDayCollection");
// handleAsyncCases(builder, getipcreditInsuranceBill, "creditInsuranceBill");
// handleAsyncCases(builder, getipcreditInsuranceBillPending, "creditInsuranceBillPending");

// export {
//   getAdvanceCollection,
//   getAdvanceRefund,
//   getAdvanceSettled,
//   getcollectionagainSaleTotal,
//   getcollectionagainSaleDeduction,
//   getcomplimentory,
//   getcreditInsuranceBillCollection,
//   getIpconsolidatedDiscount,
//   getipPreviousDayDiscount,
//   getunsettledAmount,
//   getipPreviousDayCollection,
//   getipcreditInsuranceBill,
//   getipcreditInsuranceBillPending,
// };
