import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loginInfom: {}
}


export const loginInformSlice = createSlice({
    name: "loginInform",
    initialState,
    reducers: {
        logedIformation: (state, action) => {
            // @ts-ignore
            state.loginInfom = { ...state.loginInfom, ...action.payload }
        }
    }
})

export const { logedIformation } = loginInformSlice.actions;

export const getLoggetInformation = (state) => state.login.loginInfom;

export default loginInformSlice.reducer