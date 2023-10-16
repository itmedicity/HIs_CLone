// @ts-nocheck
import React from 'react'

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosinstance } from '../../controllers/AxiosConfig'

const getOpYearCount = createAsyncThunk('/api/opyear', (postData) => {
    return axiosinstance.post("/dashboard/opyear", postData)
        .then((response) => {
            return response.data;
        })
})

const getIpYearCount = createAsyncThunk('/api/ipyear', (postData) => {
    return axiosinstance.post("/dashboard/ipyear", postData)
        .then((response) => {
            return response.data;
        })
})

const getOpCurrentYearCount = createAsyncThunk('/api/opcurrentyear', (postData) => {
    return axiosinstance.post("/dashboard/opcurrentyear", postData)
        .then((response) => {
            return response.data;
        })
})

const getIpCurrentYearCount = createAsyncThunk('/api/ipcurrentyear', (postData) => {
    return axiosinstance.post("/dashboard/ipcurrentyear", postData)
        .then((response) => {
            return response.data;
        })
})

const getOpMonthCount = createAsyncThunk('/api/opmonth', (postData) => {
    return axiosinstance.post("/dashboard/opmonth", postData)
        .then((response) => {
            return response.data;
        })
})

const getIpMonthCount = createAsyncThunk('/api/ipmonth', (postData) => {
    return axiosinstance.post("/dashboard/ipmonth", postData)
        .then((response) => {
            return response.data;
        })
})


const getOpCurrentMonth = createAsyncThunk('/api/opcurrentmonth', (postData) => {
    return axiosinstance.post("/dashboard/opcurrentmonth", postData)
        .then((response) => {
            return response.data;
        })
})

const getIpCurrentMonth = createAsyncThunk('/api/ipcurrentmonth', (postData) => {
    return axiosinstance.post("/dashboard/ipcurrentmonth", postData)
        .then((response) => {
            return response.data;
        })
})


const getOpDayCount = createAsyncThunk('/api/opday', (postData) => {
    return axiosinstance.post("/dashboard/opday", postData)
        .then((response) => {
            return response.data;
        })
})

const getIpDayCount = createAsyncThunk('/api/ipday', (postData) => {
    return axiosinstance.post("/dashboard/ipday", postData)
        .then((response) => {
            return response.data;
        })
})


const initialState = {
    opcountYear: {
        data: [],
        status: 0,
        message: "",
    },

    ipcountYear: {
        data: [],
        status: 0,
        message: "",
    },

    opcountCurrentYear: {
        data: [],
        status: 0,
        message: "",
    },
    ipcountCurrentYear: {
        data: [],
        status: 0,
        message: "",
    },


    opcountMonth: {
        data: [],
        status: 0,
        message: "",
    },
    ipcountMonth: {
        data: [],
        status: 0,
        message: "",
    },

    opcountCurrentMonth: {
        data: [],
        status: 0,
        message: "",
    },
    ipcountCurrentMonth: {
        data: [],
        status: 0,
        message: "",
    },


    opcountDay: {
        data: [],
        status: 0,
        message: "",
    },
    ipcountDay: {
        data: [],
        status: 0,
        message: "",
    },

    loading: true
}

const sliceDashBoard = createSlice({

    name: "OPIPCount",
    initialState,
    reducers: {},
    extraReducers: {
        // opcount year base
        [getOpYearCount.pending]: (state, { payload }) => {
            state.opcountYear.status = 0
            state.opcountYear.message = "pending"
            state.loading = true
        },

        [getOpYearCount.rejected]: (state, { payload }) => {
            state.opcountYear.status = 1
            state.opcountYear.message = "Error"
            state.loading = false
        },

        [getOpYearCount.fulfilled]: (state, { payload }) => {
            state.opcountYear.status = payload.success
            state.opcountYear.message = payload.message
            state.loading = false
            state.opcountYear.data = payload.data
        },

        // ipcount year base

        [getIpYearCount.pending]: (state, { payload }) => {
            state.ipcountYear.status = 0
            state.ipcountYear.message = "pending"
            state.loading = true
        },

        [getIpYearCount.rejected]: (state, { payload }) => {
            state.ipcountYear.status = 1
            state.ipcountYear.message = "Error"
            state.loading = false
        },

        [getIpYearCount.fulfilled]: (state, { payload }) => {
            state.ipcountYear.status = payload.success
            state.ipcountYear.message = payload.message
            state.loading = false
            state.ipcountYear.data = payload.data
        },

        // op count current year
        [getOpCurrentYearCount.pending]: (state, { payload }) => {
            state.opcountCurrentYear.status = 0
            state.opcountCurrentYear.message = "pending"
            state.loading = true
        },

        [getOpCurrentYearCount.rejected]: (state, { payload }) => {
            state.opcountCurrentYear.status = 1
            state.opcountCurrentYear.message = "Error"
            state.loading = false
        },

        [getOpCurrentYearCount.fulfilled]: (state, { payload }) => {
            state.opcountCurrentYear.status = payload.success
            state.opcountCurrentYear.message = payload.message
            state.loading = false
            state.opcountCurrentYear.data = payload.data
        },


        // ipcount current year
        [getIpCurrentYearCount.pending]: (state, { payload }) => {
            state.ipcountCurrentYear.status = 0
            state.ipcountCurrentYear.message = "pending"
            state.loading = true
        },

        [getIpCurrentYearCount.rejected]: (state, { payload }) => {
            state.ipcountCurrentYear.status = 1
            state.ipcountCurrentYear.message = "Error"
            state.loading = false
        },

        [getIpCurrentYearCount.fulfilled]: (state, { payload }) => {
            state.ipcountCurrentYear.status = payload.success
            state.ipcountCurrentYear.message = payload.message
            state.loading = false
            state.ipcountCurrentYear.data = payload.data
        },


        // op count month
        [getOpMonthCount.pending]: (state, { payload }) => {
            state.opcountMonth.status = 0
            state.opcountMonth.message = "pending"
            state.loading = true
        },

        [getOpMonthCount.rejected]: (state, { payload }) => {
            state.opcountMonth.status = 1
            state.opcountMonth.message = "Error"
            state.loading = false
        },

        [getOpMonthCount.fulfilled]: (state, { payload }) => {
            state.opcountMonth.status = payload.success
            state.opcountMonth.message = payload.message
            state.loading = false
            state.opcountMonth.data = payload.data
        },


        // ipcount month
        [getIpMonthCount.pending]: (state, { payload }) => {
            state.ipcountMonth.status = 0
            state.ipcountMonth.message = "pending"
            state.loading = true
        },

        [getIpMonthCount.rejected]: (state, { payload }) => {
            state.ipcountMonth.status = 1
            state.ipcountMonth.message = "Error"
            state.loading = false
        },

        [getIpMonthCount.fulfilled]: (state, { payload }) => {
            state.ipcountMonth.status = payload.success
            state.ipcountMonth.message = payload.message
            state.loading = false
            state.ipcountMonth.data = payload.data
        },


        // op count Current Month
        [getOpCurrentMonth.pending]: (state, { payload }) => {
            state.opcountCurrentMonth.status = 0
            state.opcountCurrentMonth.message = "pending"
            state.loading = true
        },

        [getOpCurrentMonth.rejected]: (state, { payload }) => {
            state.opcountCurrentMonth.status = 1
            state.opcountCurrentMonth.message = "Error"
            state.loading = false
        },

        [getOpCurrentMonth.fulfilled]: (state, { payload }) => {
            state.opcountCurrentMonth.status = payload.success
            state.opcountCurrentMonth.message = payload.message
            state.loading = false
            state.opcountCurrentMonth.data = payload.data
        },


        // ipcount Current month
        [getIpCurrentMonth.pending]: (state, { payload }) => {
            state.ipcountCurrentMonth.status = 0
            state.ipcountCurrentMonth.message = "pending"
            state.loading = true
        },

        [getIpCurrentMonth.rejected]: (state, { payload }) => {
            state.ipcountCurrentMonth.status = 1
            state.ipcountCurrentMonth.message = "Error"
            state.loading = false
        },

        [getIpCurrentMonth.fulfilled]: (state, { payload }) => {
            state.ipcountCurrentMonth.status = payload.success
            state.ipcountCurrentMonth.message = payload.message
            state.loading = false
            state.ipcountCurrentMonth.data = payload.data

        },

        // op count day
        [getOpDayCount.pending]: (state, { payload }) => {
            state.opcountDay.status = 0
            state.opcountDay.message = "pending"
            state.loading = true
        },

        [getOpDayCount.rejected]: (state, { payload }) => {
            state.opcountDay.status = 1
            state.opcountDay.message = "Error"
            state.loading = false
        },

        [getOpDayCount.fulfilled]: (state, { payload }) => {
            state.opcountDay.status = payload.success
            state.opcountDay.message = payload.message
            state.loading = false
            state.opcountDay.data = payload.data
        },


        // ipcount day
        [getIpDayCount.pending]: (state, { payload }) => {
            state.ipcountDay.status = 0
            state.ipcountDay.message = "pending"
            state.loading = true
        },

        [getIpDayCount.rejected]: (state, { payload }) => {
            state.ipcountDay.status = 1
            state.ipcountDay.message = "Error"
            state.loading = false
        },

        [getIpDayCount.fulfilled]: (state, { payload }) => {
            state.ipcountDay.status = payload.success
            state.ipcountDay.message = payload.message
            state.loading = false
            state.ipcountDay.data = payload.data

        },

    }

})
export const getOpYearCountselector = (state) => {
    return state.dashBoardSlice.opcountYear.data;
}
export const getIpYearCountselector = (state) => {
    return state.dashBoardSlice.ipcountYear.data;
}
export const getOpCurrentYearselector = (state) => {
    return state.dashBoardSlice.opcountCurrentYear.data;
}
export const getIpCurrentYearselector = (state) => {
    return state.dashBoardSlice.ipcountCurrentYear.data;
}
export const getOpMonthCountselector = (state) => {
    return state.dashBoardSlice.opcountMonth.data;
}
export const getIpMonthCountselector = (state) => {
    return state.dashBoardSlice.ipcountMonth.data;
}
export const getOpDayCountselector = (state) => {
    return state.dashBoardSlice.opcountDay.data;
}
export const getIpDayCountselector = (state) => {
    return state.dashBoardSlice.ipcountDay.data;
}

export const getOpCurrentMonthselector = (state) => {
    return state.dashBoardSlice.opcountCurrentMonth.data;
}
export const getIpCurrentMonthselector = (state) => {
    return state.dashBoardSlice.ipcountCurrentMonth.data;
}


export {
    getOpYearCount,
    getIpYearCount,
    getOpCurrentYearCount,
    getIpCurrentYearCount,
    getOpMonthCount,
    getIpMonthCount,
    getOpDayCount,
    getIpDayCount,
    getOpCurrentMonth,
    getIpCurrentMonth

}
export default sliceDashBoard.reducer
