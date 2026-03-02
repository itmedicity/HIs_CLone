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
        const response = await axiosinstance.post(`/pharmacyTssh/${endPoint}`, postData);
        return response.data;
      } catch (error) {
        return rejectWithValue(error?.response?.data || "Network Error");
      }
    },
    {
      // prevents duplicate call if already successful
      condition: (_, {getState}) => {
        const state = getState().pharmacyIncomeTssh[stateKey];
        if (state?.status === 1) return false;
      },
    },
  );

export const getPhaSalePartTssh1 = createApiThunk("phaSalePartTssh1", "phaSalePart1", "phaSalePart1");
export const getPhaReturnPartTssh1 = createApiThunk("phaReturnPartTssh1", "phaReturnPart1", "phaReturnPart1");
export const getPhaSalePartTssh2 = createApiThunk("phaSalePartTssh2", "phaSalePart2", "phaSalePart2");
export const getPhaReturnPartTssh2 = createApiThunk("phaReturnPartTssh2", "phaReturnPart2", "phaReturnPart2");
export const getPhaSalePartTssh3 = createApiThunk("phaSalePartTssh3", "phaSalePart3", "phaSalePart3");
export const getPhaReturnPartTssh3 = createApiThunk("phaReturnPartTssh3", "phaReturnPart3", "phaReturnPart3");

const createInitialState = () => ({
  data: [],
  status: 0, // 0=pending, 1=success, 2=error
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

const incomeSliceTssh = createSlice({
  name: "incomeDataPartTssh",
  initialState,
  reducers: {
    resetIncomeTsshState: () => initialState,
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

    addCases(getPhaSalePartTssh1, "phaSalePart1");
    addCases(getPhaReturnPartTssh1, "phaReturnPart1");
    addCases(getPhaSalePartTssh2, "phaSalePart2");
    addCases(getPhaReturnPartTssh2, "phaReturnPart2");
    addCases(getPhaSalePartTssh3, "phaSalePart3");
    addCases(getPhaReturnPartTssh3, "phaReturnPart3");
  },
});

export const {resetIncomeTsshState} = incomeSliceTssh.actions;
export default incomeSliceTssh.reducer;

/***
 * 
 * const getPhaSalePartTssh1 = createAsyncThunk("api/phaSalePartTssh1", (postData) => {
  return axiosinstance.post("/pharmacyTssh/phaSalePart1", postData).then((response) => {
    return response.data;
  });
});

const getPhaReturnPartTssh1 = createAsyncThunk("api/phaReturnPartTssh1", (postData) => {
  return axiosinstance.post("/pharmacyTssh/phaReturnPart1", postData).then((response) => {
    return response.data;
  });
});

const getPhaSalePartTssh2 = createAsyncThunk("api/phaSalePartTssh2", (postData) => {
  return axiosinstance.post("/pharmacyTssh/phaSalePart2", postData).then((response) => {
    return response.data;
  });
});

const getPhaReturnPartTssh2 = createAsyncThunk("api/phaReturnPartTssh2", (postData) => {
  return axiosinstance.post("/pharmacyTssh/phaReturnPart2", postData).then((response) => {
    return response.data;
  });
});

const getPhaSalePartTssh3 = createAsyncThunk("api/phaSalePartTssh3", (postData) => {
  return axiosinstance.post("/pharmacyTssh/phaSalePart3", postData).then((response) => {
    return response.data;
  });
});

const getPhaReturnPartTssh3 = createAsyncThunk("api/phaReturnPartTssh3", (postData) => {
  return axiosinstance.post("/pharmacyTssh/phaReturnPart3", postData).then((response) => {
    return response.data;
  });
});


const initialState = {
  phaSalePart1: {
    data: [],
    status: 0,
    remove: 0,
    message: "",
  },
  phaReturnPart1: {
    data: [],
    status: 0,
    remove: 0,
    message: "",
  },
  phaSalePart2: {
    data: [],
    status: 0,
    remove: 0,
    message: "",
  },
  phaReturnPart2: {
    data: [],
    status: 0,
    remove: 0,
    message: "",
  },
  phaSalePart3: {
    data: [],
    status: 0,
    remove: 0,
    message: "",
  },
  phaReturnPart3: {
    data: [],
    status: 0,
    remove: 0,
    message: "",
  },
};

 * 


    // @ts-ignore
    [getPhaSalePartTssh1.pending]: (state, {payload}) => {
      state.phaSalePart1.status = 0;
      state.phaSalePart1.message = "pending";
      state.loading = true;
    },
    // @ts-ignore
    [getPhaSalePartTssh1.rejected]: (state, {payload}) => {
      state.phaSalePart1.status = 2;
      state.phaSalePart1.message = "Error";
      state.loading = false;
    },
    // @ts-ignore
    [getPhaSalePartTssh1.fulfilled]: (state, {payload}) => {
      state.phaSalePart1.status = payload.success;
      state.phaSalePart1.message = payload.message;
      state.loading = false;
      state.phaSalePart1.data = payload.data;
    },

    // @ts-ignore
    [getPhaReturnPartTssh1.pending]: (state, {payload}) => {
      state.phaReturnPart1.status = 0;
      state.phaReturnPart1.message = "pending";
      state.loading = true;
    },
    // @ts-ignore
    [getPhaReturnPartTssh1.rejected]: (state, {payload}) => {
      state.phaReturnPart1.status = 2;
      state.phaReturnPart1.message = "Error";
      state.loading = false;
    },
    // @ts-ignore
    [getPhaReturnPartTssh1.fulfilled]: (state, {payload}) => {
      state.phaReturnPart1.status = payload.success;
      state.phaReturnPart1.message = payload.message;
      state.loading = false;
      state.phaReturnPart1.data = payload.data;
    },

    // @ts-ignore
    [getPhaSalePartTssh2.pending]: (state, {payload}) => {
      state.phaSalePart2.status = 0;
      state.phaSalePart2.message = "pending";
      state.loading = true;
    },
    // @ts-ignore
    [getPhaSalePartTssh2.rejected]: (state, {payload}) => {
      state.phaSalePart2.status = 2;
      state.phaSalePart2.message = "Error";
      state.loading = false;
    },
    // @ts-ignore
    [getPhaSalePartTssh2.fulfilled]: (state, {payload}) => {
      state.phaSalePart2.status = payload.success;
      state.phaSalePart2.message = payload.message;
      state.loading = false;
      state.phaSalePart2.data = payload.data;
    },

    // @ts-ignore
    [getPhaReturnPartTssh2.pending]: (state, {payload}) => {
      state.phaReturnPart2.status = 0;
      state.phaReturnPart2.message = "pending";
      state.loading = true;
    },
    // @ts-ignore
    [getPhaReturnPartTssh2.rejected]: (state, {payload}) => {
      state.phaReturnPart2.status = 2;
      state.phaReturnPart2.message = "Error";
      state.loading = false;
    },
    // @ts-ignore
    [getPhaReturnPartTssh2.fulfilled]: (state, {payload}) => {
      state.phaReturnPart2.status = payload.success;
      state.phaReturnPart2.message = payload.message;
      state.loading = false;
      state.phaReturnPart2.data = payload.data;
    },

    // @ts-ignore
    [getPhaSalePartTssh3.pending]: (state, {payload}) => {
      state.phaSalePart3.status = 0;
      state.phaSalePart3.message = "pending";
      state.loading = true;
    },
    // @ts-ignore
    [getPhaSalePartTssh3.rejected]: (state, {payload}) => {
      state.phaSalePart3.status = 2;
      state.phaSalePart3.message = "Error";
      state.loading = false;
    },
    // @ts-ignore
    [getPhaSalePartTssh3.fulfilled]: (state, {payload}) => {
      state.phaSalePart3.status = payload.success;
      state.phaSalePart3.message = payload.message;
      state.loading = false;
      state.phaSalePart3.data = payload.data;
    },

    // @ts-ignore
    [getPhaReturnPartTssh3.pending]: (state, {payload}) => {
      state.phaReturnPart3.status = 0;
      state.phaReturnPart3.message = "pending";
      state.loading = true;
    },
    // @ts-ignore
    [getPhaReturnPartTssh3.rejected]: (state, {payload}) => {
      state.phaReturnPart3.status = 2;
      state.phaReturnPart3.message = "Error";
      state.loading = false;
    },
    // @ts-ignore
    [getPhaReturnPartTssh3.fulfilled]: (state, {payload}) => {
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
 * 
 * 
 * 
 * 
 * 
 */
