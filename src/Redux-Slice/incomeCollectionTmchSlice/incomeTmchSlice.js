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
        const response = await axiosinstance.post(`/pharmacyTmch/${endPoint}`, postData);
        return response.data;
      } catch (error) {
        return rejectWithValue(error?.response?.data || "Network Error");
      }
    },
    {
      // prevents duplicate calls to the API when a request is already pending
      condition: (_, {getState}) => {
        const state = getState().pharmacyIncomeTmch[stateKey];
        if (state?.status === 1) return false;
      },
    },
  );

export const getPhaSalePartTmch1 = createApiThunk("phaSalePartTmch1", "phaSalePart1", "phaSalePart1");
export const getPhaReturnPartTmch1 = createApiThunk("phaReturnPartTmch1", "phaReturnPart1", "phaReturnPart1");
export const getPhaSalePartTmch2 = createApiThunk("phaSalePartTmch2", "phaSalePart2", "phaSalePart2");
export const getPhaReturnPartTmch2 = createApiThunk("phaReturnPartTmch2", "phaReturnPart2", "phaReturnPart2");
export const getPhaSalePartTmch3 = createApiThunk("phaSalePartTmch3", "phaSalePart3", "phaSalePart3");
export const getPhaReturnPartTmch3 = createApiThunk("phaReturnPartTmch3", "phaReturnPart3", "phaReturnPart3");

const createInitialState = () => ({
  data: [],
  status: 0,
  message: "",
});

const initialState = {
  phaSalePart1: createInitialState(),
  phaReturnPart1: createInitialState(),
  phaSalePart2: createInitialState(),
  phaReturnPart2: createInitialState(),
  phaSalePart3: createInitialState(),
  phaReturnPart3: createInitialState(),
};

const incomeSliceTmch = createSlice({
  name: "incomeDataPartTmch",
  initialState,
  reducers: {
    resetPharmacyIncomeState: () => initialState,
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

    addCases(getPhaSalePartTmch1, "phaSalePart1");
    addCases(getPhaReturnPartTmch1, "phaReturnPart1");
    addCases(getPhaSalePartTmch2, "phaSalePart2");
    addCases(getPhaReturnPartTmch2, "phaReturnPart2");
    addCases(getPhaSalePartTmch3, "phaSalePart3");
    addCases(getPhaReturnPartTmch3, "phaReturnPart3");
  },
});

export const {resetPharmacyIncomeState} = incomeSliceTmch.actions;
export default incomeSliceTmch.reducer;

// const getPhaSalePartTmch1 = createAsyncThunk("api/phaSalePartTmch1", (postData) => {
//   return axiosinstance.post("/pharmacyTmch/phaSalePart1", postData).then((response) => {
//     return response.data;
//   });
// });

// const getPhaReturnPartTmch1 = createAsyncThunk("api/phaReturnPartTmch1", (postData) => {
//   return axiosinstance.post("/pharmacyTmch/phaReturnPart1", postData).then((response) => {
//     return response.data;
//   });
// });

// const getPhaSalePartTmch2 = createAsyncThunk("api/phaSalePartTmch2", (postData) => {
//   return axiosinstance.post("/pharmacyTmch/phaSalePart2", postData).then((response) => {
//     return response.data;
//   });
// });

// const getPhaReturnPartTmch2 = createAsyncThunk("api/phaReturnPartTmch2", (postData) => {
//   return axiosinstance.post("/pharmacyTmch/phaReturnPart2", postData).then((response) => {
//     return response.data;
//   });
// });

// const getPhaSalePartTmch3 = createAsyncThunk("api/phaSalePartTmch3", (postData) => {
//   return axiosinstance.post("/pharmacyTmch/phaSalePart3", postData).then((response) => {
//     return response.data;
//   });
// });

// const getPhaReturnPartTmch3 = createAsyncThunk("api/phaReturnPartTmch3", (postData) => {
//   return axiosinstance.post("/pharmacyTmch/phaReturnPart3", postData).then((response) => {
//     return response.data;
//   });
// });

/***
 * 
 * 
 *     // @ts-ignore
    [getPhaSalePartTmch1.pending]: (state, {payload}) => {
      state.phaSalePart1.status = 0;
      state.phaSalePart1.message = "pending";
      state.loading = true;
    },
    // @ts-ignore
    [getPhaSalePartTmch1.rejected]: (state, {payload}) => {
      state.phaSalePart1.status = 2;
      state.phaSalePart1.message = "Error";
      state.loading = false;
    },
    // @ts-ignore
    [getPhaSalePartTmch1.fulfilled]: (state, {payload}) => {
      state.phaSalePart1.status = payload.success;
      state.phaSalePart1.message = payload.message;
      state.loading = false;
      state.phaSalePart1.data = payload.data;
    },
 *   // @ts-ignore
    [getPhaReturnPartTmch1.pending]: (state, {payload}) => {
      state.phaReturnPart1.status = 0;
      state.phaReturnPart1.message = "pending";
      state.loading = true;
    },
    // @ts-ignore
    [getPhaReturnPartTmch1.rejected]: (state, {payload}) => {
      state.phaReturnPart1.status = 2;
      state.phaReturnPart1.message = "Error";
      state.loading = false;
    },
    // @ts-ignore
    [getPhaReturnPartTmch1.fulfilled]: (state, {payload}) => {
      state.phaReturnPart1.status = payload.success;
      state.phaReturnPart1.message = payload.message;
      state.loading = false;
      state.phaReturnPart1.data = payload.data;
    },

 *   // @ts-ignore
    [getPhaSalePartTmch2.pending]: (state, {payload}) => {
      state.phaSalePart2.status = 0;
      state.phaSalePart2.message = "pending";
      state.loading = true;
    },
    // @ts-ignore
    [getPhaSalePartTmch2.rejected]: (state, {payload}) => {
      state.phaSalePart2.status = 2;
      state.phaSalePart2.message = "Error";
      state.loading = false;
    },
    // @ts-ignore
    [getPhaSalePartTmch2.fulfilled]: (state, {payload}) => {
      state.phaSalePart2.status = payload.success;
      state.phaSalePart2.message = payload.message;
      state.loading = false;
      state.phaSalePart2.data = payload.data;
    },
 * 
 *     // @ts-ignore
    [getPhaReturnPartTmch2.pending]: (state, {payload}) => {
      state.phaReturnPart2.status = 0;
      state.phaReturnPart2.message = "pending";
      state.loading = true;
    },
    // @ts-ignore
    [getPhaReturnPartTmch2.rejected]: (state, {payload}) => {
      state.phaReturnPart2.status = 2;
      state.phaReturnPart2.message = "Error";
      state.loading = false;
    },
    // @ts-ignore
    [getPhaReturnPartTmch2.fulfilled]: (state, {payload}) => {
      state.phaReturnPart2.status = payload.success;
      state.phaReturnPart2.message = payload.message;
      state.loading = false;
      state.phaReturnPart2.data = payload.data;
    },
 *     // @ts-ignore
    [getPhaSalePartTmch3.pending]: (state, {payload}) => {
      state.phaSalePart3.status = 0;
      state.phaSalePart3.message = "pending";
      state.loading = true;
    },
    // @ts-ignore
    [getPhaSalePartTmch3.rejected]: (state, {payload}) => {
      state.phaSalePart3.status = 2;
      state.phaSalePart3.message = "Error";
      state.loading = false;
    },
    // @ts-ignore
    [getPhaSalePartTmch3.fulfilled]: (state, {payload}) => {
      state.phaSalePart3.status = payload.success;
      state.phaSalePart3.message = payload.message;
      state.loading = false;
      state.phaSalePart3.data = payload.data;
    },
 * 
 * 
 *     // @ts-ignore
    [getPhaReturnPartTmch3.pending]: (state, {payload}) => {
      state.phaReturnPart3.status = 0;
      state.phaReturnPart3.message = "pending";
      state.loading = true;
    },
    // @ts-ignore
    [getPhaReturnPartTmch3.rejected]: (state, {payload}) => {
      state.phaReturnPart3.status = 2;
      state.phaReturnPart3.message = "Error";
      state.loading = false;
    },
    // @ts-ignore
    [getPhaReturnPartTmch3.fulfilled]: (state, {payload}) => {
      state.phaReturnPart3.status = payload.success;
      state.phaReturnPart3.message = payload.message;
      state.loading = false;
      state.phaReturnPart3.data = payload.data;
    },
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */
