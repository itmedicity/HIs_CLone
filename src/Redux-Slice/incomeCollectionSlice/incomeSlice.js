import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosinstance } from '../../controllers/AxiosConfig'

const getPhaSalePart1 = createAsyncThunk('api/phaSalePart1', (postData) => {
    return axiosinstance.post("/pharmacy/phaSalePart1", postData)
        .then((response) => {
            return response.data;
        })
})

const getPhaReturnPart1 = createAsyncThunk('api/phaReturnPart1', (postData) => {
    return axiosinstance.post("/pharmacy/phaReturnPart1", postData)
        .then((response) => {
            return response.data;
        })
})

const getPhaSalePart2 = createAsyncThunk('api/phaSalePart2', (postData) => {
    return axiosinstance.post("/pharmacy/phaSalePart2", postData)
        .then((response) => {
            return response.data;
        })
})

const getPhaReturnPart2 = createAsyncThunk('api/phaReturnPart2', (postData) => {
    return axiosinstance.post("/pharmacy/phaReturnPart2", postData)
        .then((response) => {
            return response.data;
        })
})

const getPhaSalePart3 = createAsyncThunk('api/phaSalePart3', (postData) => {
    return axiosinstance.post("/pharmacy/phaSalePart3", postData)
        .then((response) => {
            return response.data;
        })
})

const getPhaReturnPart3 = createAsyncThunk('api/phaReturnPart3', (postData) => {
    return axiosinstance.post("/pharmacy/phaReturnPart3", postData)
        .then((response) => {
            return response.data;
        })
})


const initialState = {
    phaSalePart1: {
        data: [],
        status: 0,
        message: "",
    },
    phaReturnPart1: {
        data: [],
        status: 0,
        message: "",
    },
    phaSalePart2: {
        data: [],
        status: 0,
        message: "",
    },
    phaReturnPart2: {
        data: [],
        status: 0,
        message: "",
    },
    phaSalePart3: {
        data: [],
        status: 0,
        message: "",
    },
    phaReturnPart3: {
        data: [],
        status: 0,
        message: "",
    },
}

const incomeSlice = createSlice({
    name: "incomeDataPart",
    initialState,
    reducers: {},
    extraReducers: {
        // @ts-ignore
        [getPhaSalePart1.pending]: (state, { payload }) => {
            state.phaSalePart1.status = 0
            state.phaSalePart1.message = "pending"
            state.loading = true
        },
        // @ts-ignore
        [getPhaSalePart1.rejected]: (state, { payload }) => {
            state.phaSalePart1.status = 2
            state.phaSalePart1.message = "Error"
            state.loading = false
        },
        // @ts-ignore
        [getPhaSalePart1.fulfilled]: (state, { payload }) => {
            state.phaSalePart1.status = payload.success
            state.phaSalePart1.message = payload.message
            state.loading = false
            state.phaSalePart1.data = payload.data
        },

        // @ts-ignore
        [getPhaReturnPart1.pending]: (state, { payload }) => {
            state.phaReturnPart1.status = 0
            state.phaReturnPart1.message = "pending"
            state.loading = true
        },
        // @ts-ignore
        [getPhaReturnPart1.rejected]: (state, { payload }) => {
            state.phaReturnPart1.status = 2
            state.phaReturnPart1.message = "Error"
            state.loading = false
        },
        // @ts-ignore
        [getPhaReturnPart1.fulfilled]: (state, { payload }) => {
            state.phaReturnPart1.status = payload.success
            state.phaReturnPart1.message = payload.message
            state.loading = false
            state.phaReturnPart1.data = payload.data
        },

        // @ts-ignore
        [getPhaSalePart2.pending]: (state, { payload }) => {
            state.phaSalePart2.status = 0
            state.phaSalePart2.message = "pending"
            state.loading = true
        },
        // @ts-ignore
        [getPhaSalePart2.rejected]: (state, { payload }) => {
            state.phaSalePart2.status = 2
            state.phaSalePart2.message = "Error"
            state.loading = false
        },
        // @ts-ignore
        [getPhaSalePart2.fulfilled]: (state, { payload }) => {
            state.phaSalePart2.status = payload.success
            state.phaSalePart2.message = payload.message
            state.loading = false
            state.phaSalePart2.data = payload.data
        },

        // @ts-ignore
        [getPhaReturnPart2.pending]: (state, { payload }) => {
            state.phaReturnPart2.status = 0
            state.phaReturnPart2.message = "pending"
            state.loading = true
        },
        // @ts-ignore
        [getPhaReturnPart2.rejected]: (state, { payload }) => {
            state.phaReturnPart2.status = 2
            state.phaReturnPart2.message = "Error"
            state.loading = false
        },
        // @ts-ignore
        [getPhaReturnPart2.fulfilled]: (state, { payload }) => {
            state.phaReturnPart2.status = payload.success
            state.phaReturnPart2.message = payload.message
            state.loading = false
            state.phaReturnPart2.data = payload.data
        },

        // @ts-ignore
        [getPhaSalePart3.pending]: (state, { payload }) => {
            state.phaSalePart3.status = 0
            state.phaSalePart3.message = "pending"
            state.loading = true
        },
        // @ts-ignore
        [getPhaSalePart3.rejected]: (state, { payload }) => {
            state.phaSalePart3.status = 2
            state.phaSalePart3.message = "Error"
            state.loading = false
        },
        // @ts-ignore
        [getPhaSalePart3.fulfilled]: (state, { payload }) => {
            state.phaSalePart3.status = payload.success
            state.phaSalePart3.message = payload.message
            state.loading = false
            state.phaSalePart3.data = payload.data
        },

        // @ts-ignore
        [getPhaReturnPart3.pending]: (state, { payload }) => {
            state.phaReturnPart3.status = 0
            state.phaReturnPart3.message = "pending"
            state.loading = true
        },
        // @ts-ignore
        [getPhaReturnPart3.rejected]: (state, { payload }) => {
            state.phaReturnPart3.status = 2
            state.phaReturnPart3.message = "Error"
            state.loading = false
        },
        // @ts-ignore
        [getPhaReturnPart3.fulfilled]: (state, { payload }) => {
            state.phaReturnPart3.status = payload.success
            state.phaReturnPart3.message = payload.message
            state.loading = false
            state.phaReturnPart3.data = payload.data
        },
    }
})

export {
    getPhaSalePart1,
    getPhaSalePart2,
    getPhaSalePart3,
    getPhaReturnPart1,
    getPhaReturnPart2,
    getPhaReturnPart3
}

export default incomeSlice.reducer;