import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosinstance } from '../../controllers/AxiosConfig'

//mis group 
const getMisGroup = createAsyncThunk('api/misGroup', (postData) => {
    return axiosinstance.get("/collection/misGroup")
        .then((response) => {
            return response.data;
        })
})

//mis group master

const getMisGroupMaster = createAsyncThunk('api/misMaster', (postData) => {
    return axiosinstance.get("/collection/misMaster")
        .then((response) => {
            return response.data;
        })
})


const initialState = {
    misGroupMaster: {
        data: [],
        status: false
    },
    misGroupState: {
        data: [],
        status: false
    }
}

const misGroupSlice = createSlice({
    name: "incomeGroup",
    initialState,
    reducers: {},
    extraReducers: {
        // @ts-ignore
        [getMisGroup.pending]: (state, { payload }) => {
            state.misGroupMaster.status = false
        },
        // @ts-ignore
        [getMisGroup.rejected]: (state, { payload }) => {
            state.misGroupMaster.status = false
        },
        // @ts-ignore
        [getMisGroup.fulfilled]: (state, { payload }) => {
            state.misGroupMaster.status = true
            state.misGroupMaster.data = payload.data
        },

        // @ts-ignore
        [getMisGroupMaster.pending]: (state, { payload }) => {
            state.misGroupState.status = false
        },
        // @ts-ignore
        [getMisGroupMaster.rejected]: (state, { payload }) => {
            state.misGroupState.status = false
        },
        // @ts-ignore
        [getMisGroupMaster.fulfilled]: (state, { payload }) => {
            state.misGroupState.status = true
            state.misGroupState.data = payload.data
        },
    }
})

export {
    getMisGroup,
    getMisGroupMaster
}

export default misGroupSlice.reducer