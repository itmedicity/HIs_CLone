import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosinstance } from '../../controllers/AxiosConfig';


const getGstreportsPartOne = createAsyncThunk('api/getGstreportsPartOne', (postData) => {
    return axiosinstance.post("/gstReport/getGstreportsPartOne", postData)
        .then((response) => {
            return response.data;
        })
})

const getGstreportsPartTwo = createAsyncThunk('api/getGstreportsPartTwo', (postData) => {
    return axiosinstance.post("/gstReport/getGstreportsPartTwo", postData)
        .then((response) => {
            return response.data;
        })
})

const getGstreportsPartThree = createAsyncThunk('api/getGstreportsPartThree', (postData) => {
    return axiosinstance.post("/gstReport/getGstreportsPartThree", postData)
        .then((response) => {
            return response.data;
        })
})

const getGstreportsPartFour = createAsyncThunk('api/getGstreportsPartFour', (postData) => {
    return axiosinstance.post("/gstReport/getGstreportsPartFour", postData)
        .then((response) => {
            return response.data;
        })
})

const getGstreportsPartFive = createAsyncThunk('api/getGstreportsPartFive', (postData) => {
    return axiosinstance.post("/gstReport/getGstreportsPartFive", postData)
        .then((response) => {
            return response.data;
        })
})

const initialState = {
    reportPartOne: {
        data: [],
        status: 0,
        message: "",
    },
    reportPartTwo: {
        data: [],
        status: 0,
        message: "",
    },
    reportPartThree: {
        data: [],
        status: 0,
        message: "",
    },
    reportPartFour: {
        data: [],
        status: 0,
        message: "",
    },
    reportPartFive: {
        data: [],
        status: 0,
        message: "",
    },
}


const gstReportSlice = createSlice({
    name: "gstReports",
    initialState,
    reducers: {},
    extraReducers: {
        // @ts-ignore
        [getGstreportsPartOne.pending]: (state, { payload }) => {
            state.reportPartOne.status = 0
            state.reportPartOne.message = "pending"
        },
        // @ts-ignore
        [getGstreportsPartOne.rejected]: (state, { payload }) => {
            state.reportPartOne.status = 2
            state.reportPartOne.message = "Error"
        },
        // @ts-ignore
        [getGstreportsPartOne.fulfilled]: (state, { payload }) => {
            state.reportPartOne.status = payload.success
            state.reportPartOne.message = payload.message
            state.reportPartOne.data = payload.data
        },

        // @ts-ignore
        [getGstreportsPartTwo.pending]: (state, { payload }) => {
            state.reportPartTwo.status = 0
            state.reportPartTwo.message = "pending"
        },
        // @ts-ignore
        [getGstreportsPartTwo.rejected]: (state, { payload }) => {
            state.reportPartTwo.status = 2
            state.reportPartTwo.message = "Error"
        },
        // @ts-ignore
        [getGstreportsPartTwo.fulfilled]: (state, { payload }) => {
            state.reportPartTwo.status = payload.success
            state.reportPartTwo.message = payload.message
            state.reportPartTwo.data = payload.data
        },

        // @ts-ignore
        [getGstreportsPartThree.pending]: (state, { payload }) => {
            state.reportPartThree.status = 0
            state.reportPartThree.message = "pending"
        },
        // @ts-ignore
        [getGstreportsPartThree.rejected]: (state, { payload }) => {
            state.reportPartThree.status = 2
            state.reportPartThree.message = "Error"
        },
        // @ts-ignore
        [getGstreportsPartThree.fulfilled]: (state, { payload }) => {
            state.reportPartThree.status = payload.success
            state.reportPartThree.message = payload.message
            state.reportPartThree.data = payload.data
        },

        // @ts-ignore
        [getGstreportsPartFour.pending]: (state, { payload }) => {
            state.reportPartFour.status = 0
            state.reportPartFour.message = "pending"
        },
        // @ts-ignore
        [getGstreportsPartFour.rejected]: (state, { payload }) => {
            state.reportPartFour.status = 2
            state.reportPartFour.message = "Error"
        },
        // @ts-ignore
        [getGstreportsPartFour.fulfilled]: (state, { payload }) => {
            state.reportPartFour.status = payload.success
            state.reportPartFour.message = payload.message
            state.reportPartFour.data = payload.data
        },

        // @ts-ignore
        [getGstreportsPartFive.pending]: (state, { payload }) => {
            state.reportPartFive.status = 0
            state.reportPartFive.message = "pending"
        },
        // @ts-ignore
        [getGstreportsPartFive.rejected]: (state, { payload }) => {
            state.reportPartFive.status = 2
            state.reportPartFive.message = "Error"
        },
        // @ts-ignore
        [getGstreportsPartFive.fulfilled]: (state, { payload }) => {
            state.reportPartFive.status = payload.success
            state.reportPartFive.message = payload.message
            state.reportPartFive.data = payload.data
        },
    }
})

export {
    getGstreportsPartOne,
    getGstreportsPartTwo,
    getGstreportsPartThree,
    getGstreportsPartFour,
    getGstreportsPartFive
}

export default gstReportSlice.reducer;