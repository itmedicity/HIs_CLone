import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {axiosinstance} from "../../controllers/AxiosConfig";

const getPhaSalePartTssh1 = createAsyncThunk("api/phaSalePartTssh1", (postData) => {
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

const incomeSliceTssh = createSlice({
  name: "incomeDataPartTssh",
  initialState,
  reducers: {},
  extraReducers: {
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
  },
});

export {getPhaSalePartTssh1, getPhaSalePartTssh2, getPhaSalePartTssh3, getPhaReturnPartTssh1, getPhaReturnPartTssh2, getPhaReturnPartTssh3};

export default incomeSliceTssh.reducer;
