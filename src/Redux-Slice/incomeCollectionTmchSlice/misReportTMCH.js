import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {axiosinstance} from "../../controllers/AxiosConfig";

export const getMisReportTMCH = createAsyncThunk("misReportTmch/get", async (postData, {rejectWithValue}) => {
  if (!postData || typeof postData !== "object") {
    return rejectWithValue("Invalid Data");
  }

  try {
    const response = await axiosinstance.post("/getMisReportsTmch/getMisIncomeCollectionReportTMCH", postData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data || "Network Error");
  }
});

const initialState = {
  misReportTmchState: {
    data: {},
    status: 2, // start idle
    message: "",
  },
};

const misReportTMCH = createSlice({
  name: "misReportTmch",
  initialState,
  reducers: {
    resetMisResetTmch: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMisReportTMCH.pending, (state) => {
        state.misReportTmchState.status = 0;
        state.misReportTmchState.message = "pending";
        state.misReportTmchState.data = {};
      })
      .addCase(getMisReportTMCH.fulfilled, (state, {payload}) => {
        // console.log(payload.data);
        state.misReportTmchState.status = payload?.success ?? 2;
        state.misReportTmchState.message = payload?.message ?? "";
        state.misReportTmchState.data = payload?.data ?? {};
      })
      .addCase(getMisReportTMCH.rejected, (state, action) => {
        state.misReportTmchState.status = 2;
        state.misReportTmchState.message = action.payload || "Error";
      });
  },
});

export const {resetMisResetTmch} = misReportTMCH.actions;
export default misReportTMCH.reducer;
