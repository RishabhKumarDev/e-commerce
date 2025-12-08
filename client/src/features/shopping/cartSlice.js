import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    cartItems: [],
    isLoading: false,
}

export const addToCart = createAsyncThunk("shoppingCart/addToCart", async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
        const result = await axios.post("http://localhost:5000/api/shopping/cart/add", { userId, productId, quantity });
        return result?.data;
    } catch (error) {
        rejectWithValue(error.response);
    }
});

export const fetchCartItems = createAsyncThunk("shoppingCart/fetchCartItems", async (userId, { rejectWithValue }) => {
    try {
        const result = await axios.get(`http://localhost:5000/api/shopping/cart/get/${userId}`);
        return result?.data;
    } catch (error) {
        rejectWithValue(error.response);
    }
});

export const updateCartItemQty = createAsyncThunk("shoppingCart/updateCartItemQty", async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
        const result = await axios.put("http://localhost:5000/api/shopping/cart/update-cart", { userId, productId, quantity })
        return result?.data;
    } catch (error) {
        rejectWithValue(error.response);
    }
});

export const deleteCartItem = createAsyncThunk("shoppingCart/deleteCartItem", async ({ userId, productId }, { rejectWithValue }) => {
    try {
        const result = await axios.delete(`http://localhost:5000/api/shopping/cart/${userId}/${productId}`)
        return result?.data;
    } catch (error) {
        rejectWithValue(error.response)
    }
})
const cartSlice = createSlice({
    name: "shoppingCart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.isLoading = false;
                state.cartItems = [];
            })
            .addCase(fetchCartItems.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCartItems.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload?.data?.structuredItems;
            })
            .addCase(fetchCartItems.rejected, (state, action) => {
                state.isLoading = false;
                state.cartItems = [];
            })
            .addCase(updateCartItemQty.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCartItemQty.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload?.data?.structuredItems;
            })
            .addCase(updateCartItemQty.rejected, (state, action) => {
                state.isLoading = false;
                state.cartItems = [];
            })
            .addCase(deleteCartItem.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCartItem.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(deleteCartItem.rejected, (state, action) => {
                state.isLoading = false;
            })

    }
})

export default cartSlice.reducer;