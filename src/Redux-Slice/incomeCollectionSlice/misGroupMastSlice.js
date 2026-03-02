import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {axiosinstance} from "../../controllers/AxiosConfig";

const createApiThunk = (actionName, endPoint, stateKey, method = "POST") =>
  createAsyncThunk(
    `${actionName}`,
    async (postData, {rejectWithValue}) => {
      // if (!postData || typeof postData !== "object") {
      //   return rejectWithValue("Invalid Data");
      // }

      try {
        // const response = await axiosinstance.post(`${endPoint}`, postData);
        // console.log();

        let response;

        if (method === "GET") {
          response = await axiosinstance.get(endPoint);
        } else {
          response = await axiosinstance.post(endPoint, postData);
        }
        return response.data;
      } catch (error) {
        return rejectWithValue(error?.response?.data || "Network Error");
      }
    },
    {
      // prevents duplicate calls to the API when a request is already pending
      condition: (_, {getState}) => {
        // console.log("Condition check:", stateKey);
        const state = getState().misGroup[stateKey];
        // console.log("Condition check:", state?.status);
        if (state?.status === 1) return false;
      },
    },
  );

export const getMisGroup = createApiThunk("api/misGroup", "/collection/misGroup", "misGroupMaster", "GET");
export const getMisGroupMaster = createApiThunk("api/misMaster", "/collection/misMaster", "misGroupState", "GET");
export const getRoundOff = createApiThunk("api/roundOff", "/pharmacyTssh/roundOffTssh", "roundOff", "POST");

const createInitialState = () => ({
  data: [],
  status: 0, // 0=pending, 1=success, 2=error
  message: "",
});

const initialState = {
  misGroupMaster: createInitialState(),
  misGroupState: createInitialState(),
  roundOff: createInitialState(),
};

const misGroupSlice = createSlice({
  name: "incomeGroup",
  initialState,
  reducers: {
    resetMisGroupReset: () => initialState,
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

    addCases(getRoundOff, "roundOff");
    addCases(getMisGroup, "misGroupMaster");
    addCases(getMisGroupMaster, "misGroupState");
  },
});

// export {getMisGroup, getMisGroupMaster, getRoundOff};
export const {resetMisGroupReset} = misGroupSlice.actions;
export default misGroupSlice.reducer;

/***
 *   // @ts-ignore
    [getMisGroup.pending]: (state, {payload}) => {
      state.misGroupMaster.status = false;
    },
    // @ts-ignore
    [getMisGroup.rejected]: (state, {payload}) => {
      state.misGroupMaster.status = false;
    },
    // @ts-ignore
    [getMisGroup.fulfilled]: (state, {payload}) => {
      state.misGroupMaster.status = true;
      state.misGroupMaster.data = payload.data;
    },

    // @ts-ignore
    [getMisGroupMaster.pending]: (state, {payload}) => {
      state.misGroupState.status = false;
    },
    // @ts-ignore
    [getMisGroupMaster.rejected]: (state, {payload}) => {
      state.misGroupState.status = false;
    },
    // @ts-ignore
    [getMisGroupMaster.fulfilled]: (state, {payload}) => {
      state.misGroupState.status = true;
      state.misGroupState.data = payload.data;
    },

    // @ts-ignore
    [getRoundOff.pending]: (state, {payload}) => {
      state.roundOff.status = 0;
      state.roundOff.message = "pending";
      state.loading = true;
    },
    // @ts-ignore
    [getRoundOff.rejected]: (state, {payload}) => {
      state.roundOff.status = 2;
      state.roundOff.message = "Error";
      state.loading = false;
    },
    // @ts-ignore
    [getRoundOff.fulfilled]: (state, {payload}) => {
      state.roundOff.status = payload.success;
      state.roundOff.message = payload.message;
      state.loading = false;
      state.roundOff.data = payload.data;
    },
 * 
 * 
 * // //mis group
// const getMisGroup = createAsyncThunk("api/misGroup", () => {
//   return axiosinstance.get("/collection/misGroup").then((response) => {
//     console.log(response);
//     return response.data;
//   });
// });

// //mis group master

// const getMisGroupMaster = createAsyncThunk("api/misMaster", () => {
//   return axiosinstance.get("/collection/misMaster").then((response) => {
//     console.log(response);
//     return response.data;
//   });
// });

// const getRoundOff = createAsyncThunk("api/roundOff", (postData) => {
//   return axiosinstance.post("/pharmacyTssh/roundOffTssh", postData).then((response) => {
//     return response.data;
//   });
// });
 * 
 */
