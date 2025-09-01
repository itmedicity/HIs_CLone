import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosinstance } from "../../controllers/AxiosConfig";

const createApiThunk = (actionName, endPoint) =>
  createAsyncThunk(
    `api/${actionName}`,
    async (postData, { rejectWithValue }) => {
      if (!postData || typeof postData !== "object") {
        return rejectWithValue("Invalid Data");
      }

      try {
        const response = await axiosinstance.post(
          `/collectionTssh/${endPoint}`,
          postData
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data || "Network Error");
      }
    }
  );

const getAdvanceCollectionTssh = createApiThunk(
  "advanceCollectionTssh",
  "advanceCollection"
);
const getAdvanceRefundTssh = createApiThunk(
  "advanceRefundTssh",
  "advanceRefund"
);
const getAdvanceSettledTssh = createApiThunk(
  "advanceSettledTssh",
  "advanceSettled"
);
const getcollectionagainSaleTotalTssh = createApiThunk(
  "collectionagainSaleTotalTssh",
  "collectionagainSaleTotal"
);
const getcollectionagainSaleDeductionTssh = createApiThunk(
  "collectionagainSaleDeductionTssh",
  "collectionagainSaleDeduction"
);
const getcomplimentoryTssh = createApiThunk(
  "complimentoryTssh",
  "complimentory"
);
const getcreditInsuranceBillCollectionTssh = createApiThunk(
  "creditInsuranceBillCollectionTssh",
  "creditInsuranceBillCollection"
);
const getIpconsolidatedDiscountTssh = createApiThunk(
  "ipConsolidatedDiscountTssh",
  "ipConsolidatedDiscount"
);
const getipPreviousDayDiscountTssh = createApiThunk(
  "ipPreviousDayDiscountTssh",
  "ipPreviousDayDiscount"
);
const getunsettledAmountTssh = createApiThunk(
  "unsettledAmountTssh",
  "unsettledAmount"
);
const getipPreviousDayCollectionTssh = createApiThunk(
  "ippreviousDayCollectionTssh",
  "ipPreviousDayCollection"
);
const getipcreditInsuranceBillTssh = createApiThunk(
  "creditInsuranceBillTssh",
  "creditInsuranceBill"
);
const getipcreditInsuranceBillPending = createApiThunk(
  "creditInsuranceBillPendingTssh",
  "creditInsuranceBillRefundTssh"
);

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
    .addCase(thunk.fulfilled, (state, { payload }) => {
      state[stateKey].status = payload.success;
      state[stateKey].message = payload.message;
      state.loading = false;
      state[stateKey].data = payload.data;
    });
};

const collectionTsshSlice = createSlice({
  name: "incomeDataTssh",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handleAsyncCases(builder, getAdvanceCollectionTssh, "advanceCollection");
    handleAsyncCases(builder, getAdvanceRefundTssh, "advanceRefund");
    handleAsyncCases(builder, getAdvanceSettledTssh, "advanceSettled");
    handleAsyncCases(
      builder,
      getcollectionagainSaleTotalTssh,
      "collectionAgainstSalesTotal"
    );
    handleAsyncCases(
      builder,
      getcollectionagainSaleDeductionTssh,
      "collectionAgainstSalesDeduction"
    );
    handleAsyncCases(builder, getcomplimentoryTssh, "complimentory");
    handleAsyncCases(
      builder,
      getcreditInsuranceBillCollectionTssh,
      "creditInsuranceBillCollection"
    );
    handleAsyncCases(
      builder,
      getIpconsolidatedDiscountTssh,
      "ipConsolidatedDiscount"
    );
    handleAsyncCases(
      builder,
      getipPreviousDayDiscountTssh,
      "ipPreviousDayDiscount"
    );
    handleAsyncCases(builder, getunsettledAmountTssh, "unsettledAmount");
    handleAsyncCases(
      builder,
      getipPreviousDayCollectionTssh,
      "ippreviousDayCollection"
    );
    handleAsyncCases(
      builder,
      getipcreditInsuranceBillTssh,
      "creditInsuranceBill"
    );
    handleAsyncCases(
      builder,
      getipcreditInsuranceBillPending,
      "creditInsuranceBillPending"
    );
  },
});

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
  getipcreditInsuranceBillPending,
};

export default collectionTsshSlice.reducer;
