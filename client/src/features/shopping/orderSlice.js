import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
    isLoading: false,
    approvalURL: null,
    orderId: null,
    orderList: [],
    orderDetails: null,
}


export const createOrder = createAsyncThunk("shoppingOrder/createOrder", async (orderData, { rejectWithValue }) => {
    try {
        const result = await axios.post("http://localhost:5000/api/shopping/order/create", orderData);
        return result?.data;
    } catch (error) {
        return rejectWithValue(error?.response);
    }
});

export const capturePayment = createAsyncThunk("shoppingOrder/capturePayment", async ({ orderId, paymentId, payerId }, { rejectWithValue }) => {
    try {
        const result = await axios.post("http://localhost:5000/api/shopping/order/capture", { orderId, paymentId, payerId });
        return result?.data;
    } catch (error) {
        return rejectWithValue(error?.response);
    }
});


export const getAllOrdersByUser = createAsyncThunk("shoppingOrder/allOrders", async (userId, { rejectWithValue }) => {
    try {
        const result = await axios.get(`http://localhost:5000/api/shopping/order/list/${userId}`);
        return result?.data;
    } catch (error) {
        return rejectWithValue(error?.response);
    }
});


export const getOrderDetails = createAsyncThunk("shoppingOrder/orderDetails", async (orderId, { rejectWithValue }) => {
    try {
        const result = await axios.get(`http://localhost:5000/api/shopping/order/details/${orderId}`);
        return result?.data;
    } catch (error) {
        return rejectWithValue(error?.response);
    }
});


const ShoppingOrderSlice = createSlice({
    name: "shoppingOrder",
    initialState,
    reducers: {
        resetOrderDetails: (state) => {
            state.orderDetails = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.approvalURL = action.payload?.data.approvalURL;
                state.orderId = action.payload?.data.orderId;
                sessionStorage.setItem("orderId", JSON.stringify(action.payload.data.orderId))
            }).addCase(createOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.approvalURL = null;
                state.orderId = null;
            })
            .addCase(getAllOrdersByUser.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getAllOrdersByUser.fulfilled, (state, action) => {
                state.isLoading = false;
                console.log(action.payload?.data, "getallOrders -- AddCase")
                state.orderList = action.payload?.data;
            })
            .addCase(getAllOrdersByUser.rejected, (state, action) => {
                state.isLoading = false;
                state.orderList = [];
            })
            .addCase(getOrderDetails.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getOrderDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                console.log(action.payload?.data, "Details -- AddCase")
                state.orderDetails = action.payload?.data;
            })
            .addCase(getOrderDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.orderDetails = null;
            })
    }

});


export const { resetOrderDetails } = ShoppingOrderSlice.actions;
export default ShoppingOrderSlice.reducer;