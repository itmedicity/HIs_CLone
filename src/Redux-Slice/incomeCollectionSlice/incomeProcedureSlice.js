import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {axiosinstance} from "../../controllers/AxiosConfig";

//  Healper function async thunks

const createIncomeThunk = (type, url, statekey) =>
  createAsyncThunk(
    type,
    async (postData) => {
      const res = await axiosinstance.post(url, postData);
      return res.data;
    },
    {
      condition: (_, {getState}) => {
        const state = getState().procedureIncome[statekey];
        if (state?.status === 1) return false;
      },
    },
  );

// thunks

export const getProincome1 = createIncomeThunk("api/proIncome1", "/income/proincome1", "proincome1");
export const getProincome2 = createIncomeThunk("api/proincome2", "/income/proincome2", "proincome2");
export const getProincome3 = createIncomeThunk("api/proincome3", "/income/proincome3", "proincome3");
export const getProincome4 = createIncomeThunk("api/proincome4", "/income/proincome4", "proincome4");
export const theaterIncome = createIncomeThunk("api/theaterIncome", "/income/theaterIncome", "theaterIncome");
export const getPatietTypeDiscount = createIncomeThunk("api/patientTypeDis", "/patientType/patientTypeDis", "patientTypeDiscount");

// initital state
const baseState = {
  data: [],
  status: 0, // 0 = pending, 1 = success, 2 = error
  message: "",
  income: true,
};

const initialState = {
  proincome1: {...baseState},
  proincome2: {...baseState},
  proincome3: {...baseState},
  proincome4: {...baseState},
  theaterIncome: {...baseState},
  patientTypeDiscount: {...baseState, income: false},
};

const incomeProcedureSlice = createSlice({
  name: "incomePartQMT",
  initialState,
  reducers: {
    resetIncomeState: () => initialState,
  },
  extraReducers: (builder) => {
    const addCases = (thunk, key) => {
      builder
        .addCase(thunk.pending, (state) => {
          state[key].status = 0;
          state[key].message = "pending";
        })
        .addCase(thunk.fulfilled, (state, action) => {
          state[key].status = action.payload?.success ?? 2;
          state[key].message = action.payload?.message ?? "";
          state[key].data = action.payload?.data ?? [];
        })
        .addCase(thunk.rejected, (state) => {
          state[key].status = 2;
          state[key].message = "error";
        });
    };

    addCases(getProincome1, "proincome1");
    addCases(getProincome2, "proincome2");
    addCases(getProincome3, "proincome3");
    addCases(getProincome4, "proincome4");
    addCases(theaterIncome, "theaterIncome");
    addCases(getPatietTypeDiscount, "patientTypeDiscount");
  },
});

export const {resetIncomeState} = incomeProcedureSlice.actions;
export default incomeProcedureSlice.reducer;

// const getProincome1 = createAsyncThunk("api/proIncome1", (postData) => {
//   return axiosinstance.post("/income/proincome1", postData).then((response) => {
//     return response.data;
//   });
// });

// const getProincome2 = createAsyncThunk("api/proincome2", (postData) => {
//   return axiosinstance.post("/income/proincome2", postData).then((response) => {
//     return response.data;
//   });
// });

// const getProincome3 = createAsyncThunk("api/proincome3", (postData) => {
//   return axiosinstance.post("/income/proincome3", postData).then((response) => {
//     return response.data;
//   });
// });

// const getProincome4 = createAsyncThunk("api/proincome4", (postData) => {
//   return axiosinstance.post("/income/proincome4", postData).then((response) => {
//     return response.data;
//   });
// });

// const theaterIncome = createAsyncThunk("api/theaterIncome", (postData) => {
//   return axiosinstance.post("/income/theaterIncome", postData).then((response) => {
//     return response.data;
//   });
// });

// const getPatietTypeDiscount = createAsyncThunk("api/patientTypeDis", (postData) => {
//   return axiosinstance.post("/patientType/patientTypeDis", postData).then((response) => {
//     return response.data;
//   });
// });
