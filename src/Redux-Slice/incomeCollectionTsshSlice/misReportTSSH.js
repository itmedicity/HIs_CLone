import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {axiosinstance} from "../../controllers/AxiosConfig";

export const getMisReportTSSH = createAsyncThunk("misReportTssh/get", async (postData, {rejectWithValue}) => {
  if (!postData || typeof postData !== "object") {
    return rejectWithValue("Invalid Data");
  }

  try {
    const response = await axiosinstance.post("/getMisReportsTssh/getMisIncomeCollectionReportTSSH", postData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data || "Network Error");
  }
});

const initialState = {
  misReportTsshState: {
    data: {},
    status: 2, // start idle
    message: "",
  },
};

const misReportTSSH = createSlice({
  name: "misReportTssh",
  initialState,
  reducers: {
    resetMisResetTssh: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMisReportTSSH.pending, (state) => {
        state.misReportTsshState.status = 0;
        state.misReportTsshState.message = "pending";
        state.misReportTsshState.data = {};
      })
      .addCase(getMisReportTSSH.fulfilled, (state, {payload}) => {
        // console.log(payload.data);
        state.misReportTsshState.status = payload?.success ?? 2;
        state.misReportTsshState.message = payload?.message ?? "";
        state.misReportTsshState.data = payload?.data ?? {};
      })
      .addCase(getMisReportTSSH.rejected, (state, action) => {
        state.misReportTsshState.status = 2;
        state.misReportTsshState.message = action.payload || "Error";
      });
  },
});

export const {resetMisResetTmch} = misReportTSSH.actions;
export default misReportTSSH.reducer;
