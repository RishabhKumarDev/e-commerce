import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
    isLoading: false,
    productList: [],
    productDetails: null,
};

export const fetchAllFilteredProducts = createAsyncThunk("shoppingProducts/fetchAllFilteredProducts", async ({ filterParams, sortParams }, { rejectWithValue }) => {
    try {

        const result = await axios.get(`http://localhost:5000/api/shopping/products/get`, {
            params: {
                ...filterParams, sortParams
            }
        });
        return result?.data
    } catch (error) {
        return rejectWithValue(error.response);
    }
});

export const fetchProductDetails = createAsyncThunk("shoppingProducts/fetchProductDetails", async (productID, { rejectWithValue }) => {
    try {
        const result = await axios.get(`http://localhost:5000/api/shopping/products/get/${productID}`);
        return result?.data;
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
            .addCase(fetchProductDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProductDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                console.log(action.payload);
                state.productDetails = action.payload.data;
            })
            .addCase(fetchProductDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.productDetails = null;
            })
    }
});



export default shoppingSlice.reducer;