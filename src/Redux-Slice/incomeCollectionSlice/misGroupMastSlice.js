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

const getRoundOff = createAsyncThunk('api/roundOff', (postData) => {
    return axiosinstance.post("/pharmacyTssh/roundOffTssh", postData)
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
    },
    roundOff: {
        data: [],
        status: 0,
        remove: 1,
        message: "",
    },
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

        // @ts-ignore
        [getRoundOff.pending]: (state, { payload }) => {
            state.roundOff.status = 0
            state.roundOff.message = "pending"
            state.loading = true
        },
        // @ts-ignore
        [getRoundOff.rejected]: (state, { payload }) => {
            state.roundOff.status = 2
            state.roundOff.message = "Error"
            state.loading = false
        },
        // @ts-ignore
        [getRoundOff.fulfilled]: (state, { payload }) => {
            state.roundOff.status = payload.success
            state.roundOff.message = payload.message
            state.loading = false
            state.roundOff.data = payload.data
        },
    }
})

export {
    getMisGroup,
    getMisGroupMaster,
    getRoundOff
}

export default misGroupSlice.reducer