import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {axiosinstance} from "../../controllers/AxiosConfig";

const createApiThunk = (actionName, endPoint) =>
  createAsyncThunk(`api/${actionName}`, async (postData, {rejectWithValue}) => {
    if (!postData || typeof postData !== "object") {
      return rejectWithValue("Invalid Data");
    }
    try {
      const response = await axiosinstance.post(`/collection/${endPoint}`, postData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Network Error");
    }
  });

const getAdvanceCollection = createApiThunk("advanceCollection", "advanceCollection");
const getAdvanceRefund = createApiThunk("advanceRefund", "advanceRefund");
const getAdvanceSettled = createApiThunk("advanceSettled", "advanceSettled");
const getcollectionagainSaleTotal = createApiThunk("collectionagainSaleTotal", "collectionagainSaleTotal");
const getcollectionagainSaleDeduction = createApiThunk("collectionagainSaleDeduction", "collectionagainSaleDeduction");
const getcomplimentory = createApiThunk("complimentory", "complimentory");
const getcreditInsuranceBillCollection = createApiThunk("creditInsuranceBillCollection", "creditInsuranceBillCollection");
const getIpconsolidatedDiscount = createApiThunk("ipConsolidatedDiscount", "ipConsolidatedDiscount");
const getipPreviousDayDiscount = createApiThunk("ipPreviousDayDiscount", "ipPreviousDayDiscount");
const getunsettledAmount = createApiThunk("unsettledAmount", "unsettledAmount");
const getipPreviousDayCollection = createApiThunk("ippreviousDayCollection", "ipPreviousDayCollection");
const getipcreditInsuranceBill = createApiThunk("creditInsuranceBill", "creditInsuranceBill");
const getipcreditInsuranceBillPending = createApiThunk("creditInsuranceBillPending", "creditInsuranceBillRefund");

const createInitialState = () => ({
  data: [],
  status: 0,
  message: "",
  loading: false,
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
  loading: true,
};

const handleAsyncCases = (builder, thunk, stateKey) => {
  builder
    .addCase(thunk.pending, (state) => {
      state[stateKey].status = 0;
      state[stateKey].message = "pending";
      state.loading = true;
    })
    .addCase(thunk.rejected, (state) => {
      state[stateKey].status = 2;
      state[stateKey].message = "Error";
      state.loading = false;
    })
    .addCase(thunk.fulfilled, (state, {payload}) => {
      state[stateKey].status = payload.success;
      state[stateKey].message = payload.message;
      state.loading = false;
      state[stateKey].data = payload.data;
    });
};

const collectionSlice = createSlice({
  name: "incomeData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handleAsyncCases(builder, getAdvanceCollection, "advanceCollection");
    handleAsyncCases(builder, getAdvanceRefund, "advanceRefund");
    handleAsyncCases(builder, getAdvanceSettled, "advanceSettled");
    handleAsyncCases(builder, getcollectionagainSaleTotal, "collectionAgainstSalesTotal");
    handleAsyncCases(builder, getcollectionagainSaleDeduction, "collectionAgainstSalesDeduction");
    handleAsyncCases(builder, getcomplimentory, "complimentory");
    handleAsyncCases(builder, getcreditInsuranceBillCollection, "creditInsuranceBillCollection");
    handleAsyncCases(builder, getIpconsolidatedDiscount, "ipConsolidatedDiscount");
    handleAsyncCases(builder, getipPreviousDayDiscount, "ipPreviousDayDiscount");
    handleAsyncCases(builder, getunsettledAmount, "unsettledAmount");
    handleAsyncCases(builder, getipPreviousDayCollection, "ippreviousDayCollection");
    handleAsyncCases(builder, getipcreditInsuranceBill, "creditInsuranceBill");
    handleAsyncCases(builder, getipcreditInsuranceBillPending, "creditInsuranceBillPending");
  },
});

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
  getunsettledAmount,
  getipPreviousDayCollection,
  getipcreditInsuranceBill,
  getipcreditInsuranceBillPending,
};

export default collectionSlice.reducer;
