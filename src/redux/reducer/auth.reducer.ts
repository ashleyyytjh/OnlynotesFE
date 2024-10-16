import {createSlice} from '@reduxjs/toolkit'
import { RootState } from '../store.ts'

type authState = {
    authenticated: boolean
}

const initialState : authState = {
    authenticated: false
}


export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        authenticated: (state) => {
            state.authenticated = true;
        },
        logout: (state) => {
            state.authenticated = false;
        },
        logIn: (state) => {
            state.authenticated = true;
        }
    }
})


export const {authenticated, logout, logIn} = authenticationSlice.actions;
export const authentication = (state: RootState) => state.authentication;
export default authenticationSlice.reducer;