import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
    isLoading: false,
    orderList: [],
    orderDetails: null,
}


export const getAllOrdersAdmin = createAsyncThunk("adminOrders/allOrders", async (_, { rejectWithValue }) => {
    try {
        const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/orders/get`);
        return result?.data;
    } catch (error) {
        return rejectWithValue(error?.response);
    }
});


export const getOrderDetailsForAdmin = createAsyncThunk("adminOrders/orderDetails", async (orderId, { rejectWithValue }) => {
    try {
        const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/orders/details/${orderId}`);
        return result?.data;
    } catch (error) {
        return rejectWithValue(error?.response);
    }
});



export const updateOrderStatus = createAsyncThunk("adminOrders/orderStatus", async ({ orderId, status }, { rejectWithValue }) => {
    try {
        const result = await axios.patch(`${import.meta.env.VITE_API_URL}/api/admin/orders/update-status/${orderId}`, { status });
        return result?.data;
    } catch (error) {
        return rejectWithValue(error?.response);
    }
});


const AdminOrderSlice = createSlice({
    name: "shoppingOrder",
    initialState,
    reducers: {
        resetOrderDetails: (state) => {
            state.orderDetails = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllOrdersAdmin.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getAllOrdersAdmin.fulfilled, (state, action) => {
                state.isLoading = false;
                console.log(action.payload?.data, "getallOrders -- AddCase")
                state.orderList = action.payload?.data;
            })
            .addCase(getAllOrdersAdmin.rejected, (state, action) => {
                state.isLoading = false;
                state.orderList = [];
            })
            .addCase(getOrderDetailsForAdmin.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
                state.isLoading = false;
                console.log(action.payload?.data, "Details -- AddCase")
                state.orderDetails = action.payload?.data;
            })
            .addCase(getOrderDetailsForAdmin.rejected, (state, action) => {
                state.isLoading = false;
                state.orderDetails = null;
            })
    }
});

export const { resetOrderDetails } = AdminOrderSlice.actions;
export default AdminOrderSlice.reducer;