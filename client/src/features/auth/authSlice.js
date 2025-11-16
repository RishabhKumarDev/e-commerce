import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    isAuthanticated: false,
    isLoading: false,
    user: null,
}

// register User
export const registerUser = createAsyncThunk("/auth/register", async (formData) => {
    const response = await axios.post("http://localhost:5000/api/auth/register", formData, { withCredentials: true })
    return response.data;
});


// login User
export const loginUser = createAsyncThunk("/auth/login", async (formData, thunkAPI) => {
    try {
        const response = await axios.post("http://localhost:5000/api/auth/login", formData, { withCredentials: true })
        console.log(response);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response)
    }
})


const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setUser: (state, action) => { },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthanticated = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthanticated = false;
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.data;
                state.isAuthanticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthanticated = false;
            })


    }
});


export const { setUser } = authSlice.actions;
export default authSlice.reducer;