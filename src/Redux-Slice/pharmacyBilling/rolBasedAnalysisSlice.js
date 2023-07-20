
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosinstance } from '../../controllers/AxiosConfig'


// ROL BAsed Analysis
const getAdvanceCollection = createAsyncThunk('api/advanceCollection', (postData) => {
    return axiosinstance.post("/collection/advanceCollection", postData)
        .then((response) => {
            return response.data;
        })
})

const initialState = {
    advanceCollection: {
        data: [],
        status: 0,
        message: "",
    },
    loading: true
}

const rolBasedAnalysisSlice = createSlice({
    name: "incomeData",
    initialState,
    reducers: {},
    extraReducers: {
        //Advance Collection
        // @ts-ignore
        [getAdvanceCollection.pending]: (state, { payload }) => {
            state.advanceCollection.status = 0
            state.advanceCollection.message = "pending"
            state.loading = true
        },
        // @ts-ignore
        [getAdvanceCollection.rejected]: (state, { payload }) => {
            state.advanceCollection.status = 2
            state.advanceCollection.message = "Error"
            state.loading = false
        },
        // @ts-ignore
        [getAdvanceCollection.fulfilled]: (state, { payload }) => {
            state.advanceCollection.status = payload.success
            state.advanceCollection.message = payload.message
            state.loading = false
            state.advanceCollection.data = payload.data
        },
    }
})

export {
    getAdvanceCollection,
}

export default rolBasedAnalysisSlice.reducer;