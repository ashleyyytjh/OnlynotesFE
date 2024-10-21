import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store.ts'

type authState = {
    authenticated: boolean
    id: string,
    username:string,
    email:string
}
type AuthPayload = {
    id: string,
    username:string,
    email:string
}

const initialState: authState = {
    authenticated: false,
    id: "",
    username:"",
    email:""
}

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        authenticated: (state) => {
            state.authenticated = true
        },
        logout: (state) => {
            state.authenticated = false
        },

        logIn: (state, action : PayloadAction<AuthPayload>) => {
            state.authenticated = true;
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.email = action.payload.email;
        },
    },
})

export const { authenticated, logout, logIn } = authenticationSlice.actions
export const authentication = (state: RootState) => state.authentication
export default authenticationSlice.reducer
