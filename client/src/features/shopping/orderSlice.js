import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
    isLoading: false,
    approvalURL: null,
    orderId: null,
}


export const createOrder = createAsyncThunk("shoppingOrder/createOrder", async (orderData, { rejectWithValue }) => {
    try {
        const result = await axios.post("http://localhost:5000/api/shopping/order/create", orderData);
        return result?.data;
    } catch (error) {
        return rejectWithValue(error?.response);
    }
})
const ShoppingOrderSlice = createSlice({
    name: "shoppingOrder",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.approvalURL = action.payload?.data.approvalURL;
                state.orderId = action.payload?.data.orderId;
            }).addCase(createOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.approvalURL = null;
                state.orderId = null;
            })
    }

});


export default ShoppingOrderSlice.reducer;