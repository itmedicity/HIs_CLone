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
        const response = await axiosinstance.post(`/incomeTssh/${endPoint}`, postData);
        return response.data;
      } catch (error) {
        return rejectWithValue(error?.response?.data || "Network Error");
      }
    },
    {
      // prevents duplicate calls to the API when a request is already pending
      condition: (_, {getState}) => {
        const state = getState().procedureIncomeTssh[stateKey];
        // console.log("Condition check:", state?.status);
        if (state?.status === 1) return false;
      },
    },
  );

export const getProincomeTssh1 = createApiThunk("proIncomeTssh1", "proincome1", "proincome1");
export const getProincomeTssh2 = createApiThunk("proincomeTssh2", "proincome2", "proincome2");
export const getProincomeTssh3 = createApiThunk("proincomeTssh3", "proincome3", "proincome3");
export const getProincomeTssh4 = createApiThunk("proincomeTssh4", "proincome4", "proincome4");
export const theaterIncomeTssh = createApiThunk("theaterIncomeTssh", "theaterIncome", "theaterIncome");
export const getPatietTypeDiscountTssh = createApiThunk("patientTypeDisTssh", "patientTypeDis", "patientTypeDis");

const createInitialState = () => ({
  data: [],
  status: 0, // 0=pending, 1=success, 2=error
  message: "",
});

const initialState = {
  proincome1: createInitialState(),
  proincome2: createInitialState(),
  proincome3: createInitialState(),
  proincome4: createInitialState(),
  theaterIncome: createInitialState(),
  patientTypeDiscount: createInitialState(),
};

const incomeProcedureTsshSlice = createSlice({
  name: "incomeDataPartTssh",
  initialState,
  reducers: {
    resetINcomeProcedureTsshState: () => initialState,
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

    addCases(getProincomeTssh1, "proincome1");
    addCases(getProincomeTssh2, "proincome2");
    addCases(getProincomeTssh3, "proincome3");
    addCases(getProincomeTssh4, "proincome4");
    addCases(theaterIncomeTssh, "theaterIncome");
    addCases(getPatietTypeDiscountTssh, "patientTypeDiscount");
  },
});

export const {resetINcomeProcedureTsshState} = incomeProcedureTsshSlice.actions;
export default incomeProcedureTsshSlice.reducer;

/***
 * // Healper function async thunks

const getProincomeTssh1 = createAsyncThunk("api/proIncomeTssh1", (postData) => {
  return axiosinstance.post("/incomeTssh/proincome1", postData).then((response) => {
    return response.data;
  });
});

const getProincomeTssh2 = createAsyncThunk("api/proincomeTssh2", (postData) => {
  return axiosinstance.post("/incomeTssh/proincome2", postData).then((response) => {
    return response.data;
  });
});

const getProincomeTssh3 = createAsyncThunk("api/proincomeTssh3", (postData) => {
  return axiosinstance.post("/incomeTssh/proincome3", postData).then((response) => {
    return response.data;
  });
});

const getProincomeTssh4 = createAsyncThunk("api/proincomeTssh4", (postData) => {
  return axiosinstance.post("/incomeTssh/proincome4", postData).then((response) => {
    return response.data;
  });
});

const theaterIncomeTssh = createAsyncThunk("api/theaterIncomeTssh", (postData) => {
  return axiosinstance.post("/incomeTssh/theaterIncome", postData).then((response) => {
    return response.data;
  });
});

const getPatietTypeDiscountTssh = createAsyncThunk("api/patientTypeDisTssh", (postData) => {
  return axiosinstance.post("/patientTypeTssh/patientTypeDis", postData).then((response) => {
    return response.data;
  });
});



    // @ts-ignore
    [getProincomeTssh1.pending]: (state, {payload}) => {
      state.proincome1.status = 0;
      state.proincome1.message = "pending";
      state.loading = true;
    },
    // @ts-ignore
    [getProincomeTssh1.rejected]: (state, {payload}) => {
      state.proincome1.status = 2;
      state.proincome1.message = "Error";
      state.loading = false;
    },
    // @ts-ignore
    [getProincomeTssh1.fulfilled]: (state, {payload}) => {
      state.proincome1.status = payload.success;
      state.proincome1.message = payload.message;
      state.loading = false;
      state.proincome1.data = payload.data;
    },

    // @ts-ignore
    [getProincomeTssh2.pending]: (state, {payload}) => {
      state.proincome2.status = 0;
      state.proincome2.message = "pending";
      state.loading = true;
    },
    // @ts-ignore
    [getProincomeTssh2.rejected]: (state, {payload}) => {
      state.proincome2.status = 2;
      state.proincome2.message = "Error";
      state.loading = false;
    },
    // @ts-ignore
    [getProincomeTssh2.fulfilled]: (state, {payload}) => {
      state.proincome2.status = payload.success;
      state.proincome2.message = payload.message;
      state.loading = false;
      state.proincome2.data = payload.data;
    },

    // @ts-ignore
    [getProincomeTssh3.pending]: (state, {payload}) => {
      state.proincome3.status = 0;
      state.proincome3.message = "pending";
      state.loading = true;
    },
    // @ts-ignore
    [getProincomeTssh3.rejected]: (state, {payload}) => {
      state.proincome3.status = 2;
      state.proincome3.message = "Error";
      state.loading = false;
    },
    // @ts-ignore
    [getProincomeTssh3.fulfilled]: (state, {payload}) => {
      state.proincome3.status = payload.success;
      state.proincome3.message = payload.message;
      state.loading = false;
      state.proincome3.data = payload.data;
    },

    // @ts-ignore
    [getProincomeTssh4.pending]: (state, {payload}) => {
      state.proincome4.status = 0;
      state.proincome4.message = "pending";
      state.loading = true;
    },
    // @ts-ignore
    [getProincomeTssh4.rejected]: (state, {payload}) => {
      state.proincome4.status = 2;
      state.proincome4.message = "Error";
      state.loading = false;
    },
    // @ts-ignore
    [getProincomeTssh4.fulfilled]: (state, {payload}) => {
      state.proincome4.status = payload.success;
      state.proincome4.message = payload.message;
      state.loading = false;
      state.proincome4.data = payload.data;
    },

    // @ts-ignore
    [theaterIncomeTssh.pending]: (state, {payload}) => {
      state.theaterIncome.status = 0;
      state.theaterIncome.message = "pending";
      state.loading = true;
    },
    // @ts-ignore
    [theaterIncomeTssh.rejected]: (state, {payload}) => {
      state.theaterIncome.status = 2;
      state.theaterIncome.message = "Error";
      state.loading = false;
    },
    // @ts-ignore
    [theaterIncomeTssh.fulfilled]: (state, {payload}) => {
      state.theaterIncome.status = payload.success;
      state.theaterIncome.message = payload.message;
      state.loading = false;
      state.theaterIncome.data = payload.data;
    },

    // @ts-ignore
    [getPatietTypeDiscountTssh.pending]: (state, {payload}) => {
      state.patientTypeDiscount.status = 0;
      state.patientTypeDiscount.message = "pending";
      state.loading = true;
    },
    // @ts-ignore
    [getPatietTypeDiscountTssh.rejected]: (state, {payload}) => {
      state.patientTypeDiscount.status = 2;
      state.patientTypeDiscount.message = "Error";
      state.loading = false;
    },
    // @ts-ignore
    [getPatietTypeDiscountTssh.fulfilled]: (state, {payload}) => {
      state.patientTypeDiscount.status = payload.success;
      state.patientTypeDiscount.message = payload.message;
      state.loading = false;
      state.patientTypeDiscount.data = payload.data;
    },
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */
