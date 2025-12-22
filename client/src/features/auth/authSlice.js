import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'sonner';

const initialState = {
    isAuthanticated: false,
    isLoading: true,
    user: null,
    token: null,
}

// register User
export const registerUser = createAsyncThunk("/auth/register", async (formData, thunkAPI) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, formData, { withCredentials: true })
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response)
    }
});


// login User
export const loginUser = createAsyncThunk("/auth/login", async (formData, thunkAPI) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`,
            formData,
            { withCredentials: true }
        )
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response)
    }
})

// check Auth 
export const checkAuth = createAsyncThunk("/auth/check-auth", async (token, thunkAPI) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/check-auth`,
            {

                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate"
                }
            }
        );
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response);
    }
})

// logout user

export const logoutUser = createAsyncThunk("/auth/logoutUser", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {}, { withCredentials: true })
        toast.success(response.data.message)
        return response.data;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response);
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setUser: (state, action) => { },
        resetTokenAndCredentials: (state) => {
            state.isAuthanticated = false;
            state.user = null;
            state.token = null;
        }
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
                state.token = action.payload.data.token;
                sessionStorage.setItem("token", JSON.stringify(action.payload.data.token))
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthanticated = false;
                state.token = null
            })
            .addCase(checkAuth.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.data;
                state.isAuthanticated = true;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthanticated = false;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthanticated = false;
            })
    }
});


export const { setUser, resetTokenAndCredentials } = authSlice.actions;
export default authSlice.reducer;