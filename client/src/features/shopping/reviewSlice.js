
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';


const initialState = {
    isLoading: false,
    reviews: []
}


export const addReview = createAsyncThunk("review/add", async ({ productId,
    userId,
    userName,
    reviewMessage,
    reviewValue, }, { rejectWithValue }) => {
    try {
        const result = await axios.post("http://localhost:5000/api/shopping/review/add", { productId, userId, userName, reviewMessage, reviewValue })
        return result?.data;
    } catch (error) {
        return rejectWithValue(error.response);
    }
});


export const getReviews = createAsyncThunk("review/getReviews", async (productId, { rejectWithValue }) => {
    try {
        const result = await axios.get(`http://localhost:5000/api/shopping/review/get/${productId}`)
        return result?.data;
    } catch (error) {
        return rejectWithValue(error.response);
    }
});


const reviewSlice = createSlice({
    name: "reviewSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getReviews.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getReviews.fulfilled, (state, action) => {
                state.isLoading = false;
                state.reviews = action.payload?.data?.productReviews
            })
            .addCase(getReviews.rejected, (state, action) => {
                state.isLoading = false;
                state.reviews = [];
            })
    }
});


export default reviewSlice.reducer;