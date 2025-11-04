import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthanticated: false,
    isLoading: false,
    user: null,
}


const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setUser: (state, action) => { },
    }
});


export const { setUser } = authSlice.actions;
export default authSlice.reducer;