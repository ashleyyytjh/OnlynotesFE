import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

// Types should be declared in the types.ts folder. Putting here just to show
type authState = {
    authenticated: boolean
}

// We declare the initial state of here
const initialState: authState = {
    authenticated: false,
}

export const sampleSlice = createSlice({
    name: 'sample',
    initialState,

    reducers: {
        authenticated: (state) => {
            state.authenticated = true
        },
    },
})

// export your methods here
export const { authenticated } = sampleSlice.actions

// This is the root state
export const authentication = (state: RootState) => state.authentication

//Export the reducer and import this to the store.
export default sampleSlice.reducer
