import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
    isLoading: false,
    productList: [],
};

export const fetchAllFilteredProducts = createAsyncThunk("shoppingProducts/fetchAllFilteredProducts", async (_, { rejectWithValue }) => {
    try {
        const result = await axios.get("http://localhost:5000/api/shopping/products/get");
        return result?.data
    } catch (error) {
        return rejectWithValue(error.response);
    }
})

const shoppingSlice = createSlice({
    name: "shoppingProducts",
    initialState,
    reducers: () => { },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllFilteredProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productList = action.payload.data;
            })
            .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.productList = [];
            })
    }
});



export default shoppingSlice.reducer;