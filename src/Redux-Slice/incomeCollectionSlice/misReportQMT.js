import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {axiosinstance} from "../../controllers/AxiosConfig";

export const getMisReportQMT = createAsyncThunk("misReportQmt/get", async (postData, {rejectWithValue}) => {
  if (!postData || typeof postData !== "object") {
    return rejectWithValue("Invalid Data");
  }

  try {
    const response = await axiosinstance.post("/getMisReportsQmt/getMisReportQMT", postData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data || "Network Error");
  }
});

const initialState = {
  misReportQmtState: {
    data: {},
    status: 2, // start idle
    message: "",
  },
};

const misReportQmt = createSlice({
  name: "misReportQmt",
  initialState,
  reducers: {
    resetMisResetQmt: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMisReportQMT.pending, (state) => {
        state.misReportQmtState.status = 0;
        state.misReportQmtState.message = "pending";
        state.misReportQmtState.data = {};
      })
      .addCase(getMisReportQMT.fulfilled, (state, {payload}) => {
        // console.log(payload.data);
        state.misReportQmtState.status = payload?.success ?? 2;
        state.misReportQmtState.message = payload?.message ?? "";
        state.misReportQmtState.data = payload?.data ?? {};
      })
      .addCase(getMisReportQMT.rejected, (state, action) => {
        state.misReportQmtState.status = 2;
        state.misReportQmtState.message = action.payload || "Error";
      });
  },
});

export const {resetMisResetQmt} = misReportQmt.actions;
export default misReportQmt.reducer;
