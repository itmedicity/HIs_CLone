import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {axiosinstance} from "../../controllers/AxiosConfig";

const createApiThunk = (actionName, endPoint) =>
  createAsyncThunk(`api/${actionName}`, async (postData, {rejectWithValue}) => {
    if (!postData || typeof postData !== "object") {
      return rejectWithValue("Invalid Data");
    }
    try {
      const response = await axiosinstance.post(`/pharmacyQmt/${endPoint}`, postData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Network Error");
    }
  });

const getPhaSalePart1 = createApiThunk("phaSalePartType1", "phaSalePart1");
const getPhaReturnPart1 = createApiThunk("phaReturnPartType1", "phaReturnPart1");
const getPhaSalePart2 = createApiThunk("phaSalePartType2", "phaSalePart2");
const getPhaReturnPart2 = createApiThunk("phaReturnPartType2", "phaReturnPart2");
const getPhaSalePart3 = createApiThunk("phaSalePartType3", "phaSalePart3");
const getPhaReturnPart3 = createApiThunk("phaReturnPartType3", "phaReturnPart3");

const createInitialState = () => ({
  data: [],
  status: 0,
  message: "",
  loading: false,
});

const initialState = {
  phaSalePart1: createInitialState(),
  phaReturnPart1: createInitialState(),
  phaSalePart2: createInitialState(),
  phaReturnPart2: createInitialState(),
  phaSalePart3: createInitialState(),
  phaReturnPart3: createInitialState(),
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

const incomeTypeSlice = createSlice({
  name: "incomeDataPart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handleAsyncCases(builder, getPhaSalePart1, "phaSalePart1");
    handleAsyncCases(builder, getPhaReturnPart1, "phaReturnPart1");
    handleAsyncCases(builder, getPhaSalePart2, "phaSalePart2");
    handleAsyncCases(builder, getPhaReturnPart2, "phaReturnPart2");
    handleAsyncCases(builder, getPhaSalePart3, "phaSalePart3");
    handleAsyncCases(builder, getPhaReturnPart3, "phaReturnPart3");
  },
});

export {getPhaSalePart1, getPhaSalePart2, getPhaSalePart3, getPhaReturnPart1, getPhaReturnPart2, getPhaReturnPart3};

export default incomeTypeSlice.reducer;
