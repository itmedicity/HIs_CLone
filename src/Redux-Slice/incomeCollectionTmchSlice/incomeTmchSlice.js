import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosinstance } from '../../controllers/AxiosConfig'

const getPhaSalePartTmch1 = createAsyncThunk('api/phaSalePartTmch1', (postData) => {
    return axiosinstance.post("/pharmacyTmch/phaSalePart1", postData)
        .then((response) => {
            return response.data;
        })
})

const getPhaReturnPartTmch1 = createAsyncThunk('api/phaReturnPartTmch1', (postData) => {
    return axiosinstance.post("/pharmacyTmch/phaReturnPart1", postData)
        .then((response) => {
            return response.data;
        })
})

const getPhaSalePartTmch2 = createAsyncThunk('api/phaSalePartTmch2', (postData) => {
    return axiosinstance.post("/pharmacyTmch/phaSalePart2", postData)
        .then((response) => {
            return response.data;
        })
})

const getPhaReturnPartTmch2 = createAsyncThunk('api/phaReturnPartTmch2', (postData) => {
    return axiosinstance.post("/pharmacyTmch/phaReturnPart2", postData)
        .then((response) => {
            return response.data;
        })
})

const getPhaSalePartTmch3 = createAsyncThunk('api/phaSalePartTmch3', (postData) => {
    return axiosinstance.post("/pharmacyTmch/phaSalePart3", postData)
        .then((response) => {
            return response.data;
        })
})

const getPhaReturnPartTmch3 = createAsyncThunk('api/phaReturnPartTmch3', (postData) => {
    return axiosinstance.post("/pharmacyTmch/phaReturnPart3", postData)
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

const incomeSliceTmch = createSlice({
    name: "incomeDataPartTmch",
    initialState,
    reducers: {},
    extraReducers: {
        // @ts-ignore
        [getPhaSalePartTmch1.pending]: (state, { payload }) => {
            state.phaSalePart1.status = 0
            state.phaSalePart1.message = "pending"
            state.loading = true
        },
        // @ts-ignore
        [getPhaSalePartTmch1.rejected]: (state, { payload }) => {
            state.phaSalePart1.status = 2
            state.phaSalePart1.message = "Error"
            state.loading = false
        },
        // @ts-ignore
        [getPhaSalePartTmch1.fulfilled]: (state, { payload }) => {
            state.phaSalePart1.status = payload.success
            state.phaSalePart1.message = payload.message
            state.loading = false
            state.phaSalePart1.data = payload.data
        },

        // @ts-ignore
        [getPhaReturnPartTmch1.pending]: (state, { payload }) => {
            state.phaReturnPart1.status = 0
            state.phaReturnPart1.message = "pending"
            state.loading = true
        },
        // @ts-ignore
        [getPhaReturnPartTmch1.rejected]: (state, { payload }) => {
            state.phaReturnPart1.status = 2
            state.phaReturnPart1.message = "Error"
            state.loading = false
        },
        // @ts-ignore
        [getPhaReturnPartTmch1.fulfilled]: (state, { payload }) => {
            state.phaReturnPart1.status = payload.success
            state.phaReturnPart1.message = payload.message
            state.loading = false
            state.phaReturnPart1.data = payload.data
        },

        // @ts-ignore
        [getPhaSalePartTmch2.pending]: (state, { payload }) => {
            state.phaSalePart2.status = 0
            state.phaSalePart2.message = "pending"
            state.loading = true
        },
        // @ts-ignore
        [getPhaSalePartTmch2.rejected]: (state, { payload }) => {
            state.phaSalePart2.status = 2
            state.phaSalePart2.message = "Error"
            state.loading = false
        },
        // @ts-ignore
        [getPhaSalePartTmch2.fulfilled]: (state, { payload }) => {
            state.phaSalePart2.status = payload.success
            state.phaSalePart2.message = payload.message
            state.loading = false
            state.phaSalePart2.data = payload.data
        },

        // @ts-ignore
        [getPhaReturnPartTmch2.pending]: (state, { payload }) => {
            state.phaReturnPart2.status = 0
            state.phaReturnPart2.message = "pending"
            state.loading = true
        },
        // @ts-ignore
        [getPhaReturnPartTmch2.rejected]: (state, { payload }) => {
            state.phaReturnPart2.status = 2
            state.phaReturnPart2.message = "Error"
            state.loading = false
        },
        // @ts-ignore
        [getPhaReturnPartTmch2.fulfilled]: (state, { payload }) => {
            state.phaReturnPart2.status = payload.success
            state.phaReturnPart2.message = payload.message
            state.loading = false
            state.phaReturnPart2.data = payload.data
        },

        // @ts-ignore
        [getPhaSalePartTmch3.pending]: (state, { payload }) => {
            state.phaSalePart3.status = 0
            state.phaSalePart3.message = "pending"
            state.loading = true
        },
        // @ts-ignore
        [getPhaSalePartTmch3.rejected]: (state, { payload }) => {
            state.phaSalePart3.status = 2
            state.phaSalePart3.message = "Error"
            state.loading = false
        },
        // @ts-ignore
        [getPhaSalePartTmch3.fulfilled]: (state, { payload }) => {
            state.phaSalePart3.status = payload.success
            state.phaSalePart3.message = payload.message
            state.loading = false
            state.phaSalePart3.data = payload.data
        },

        // @ts-ignore
        [getPhaReturnPartTmch3.pending]: (state, { payload }) => {
            state.phaReturnPart3.status = 0
            state.phaReturnPart3.message = "pending"
            state.loading = true
        },
        // @ts-ignore
        [getPhaReturnPartTmch3.rejected]: (state, { payload }) => {
            state.phaReturnPart3.status = 2
            state.phaReturnPart3.message = "Error"
            state.loading = false
        },
        // @ts-ignore
        [getPhaReturnPartTmch3.fulfilled]: (state, { payload }) => {
            state.phaReturnPart3.status = payload.success
            state.phaReturnPart3.message = payload.message
            state.loading = false
            state.phaReturnPart3.data = payload.data
        },
    }
})

export {
    getPhaSalePartTmch1,
    getPhaSalePartTmch2,
    getPhaSalePartTmch3,
    getPhaReturnPartTmch1,
    getPhaReturnPartTmch2,
    getPhaReturnPartTmch3
}

export default incomeSliceTmch.reducer;