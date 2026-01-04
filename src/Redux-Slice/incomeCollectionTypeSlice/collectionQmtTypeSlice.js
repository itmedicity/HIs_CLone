import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {axiosinstance} from "../../controllers/AxiosConfig";

const createApiThunk = (actionName, endPoint) =>
  createAsyncThunk(`api/${actionName}`, async (postData, {rejectWithValue}) => {
    if (!postData || typeof postData !== "object") {
      return rejectWithValue("Invalid Data");
    }
    try {
      const response = await axiosinstance.post(`/collectionQmt/${endPoint}`, postData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Network Error");
    }
  });

const getAdvanceCollection = createApiThunk("advanceCollectionType", "advanceCollection");
const getAdvanceRefund = createApiThunk("advanceRefundType", "advanceRefund");
const getAdvanceSettled = createApiThunk("advanceSettledType", "advanceSettled");
const getcollectionagainSaleTotal = createApiThunk("collectionagainSaleTotalType", "collectionagainSaleTotal");
const getcollectionagainSaleDeduction = createApiThunk("collectionagainSaleDeductionType", "collectionagainSaleDeduction");
const getcomplimentory = createApiThunk("complimentoryType", "complimentory");
const getcreditInsuranceBillCollection = createApiThunk("creditInsuranceBillCollectionType", "creditInsuranceBillCollection");
const getIpconsolidatedDiscount = createApiThunk("ipConsolidatedDiscountType", "ipConsolidatedDiscount");
const getipPreviousDayDiscount = createApiThunk("ipPreviousDayDiscountType", "ipPreviousDayDiscount");
const getunsettledAmount = createApiThunk("unsettledAmountType", "unsettledAmount");
const getipPreviousDayCollection = createApiThunk("ippreviousDayCollectionType", "ipPreviousDayCollection");
const getipcreditInsuranceBill = createApiThunk("creditInsuranceBillType", "creditInsuranceBill");
const getipcreditInsuranceBillPending = createApiThunk("creditInsuranceBillPendingType", "creditInsuranceBillRefund");

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

const collectionQmtTypeSlice = createSlice({
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

export default collectionQmtTypeSlice.reducer;
