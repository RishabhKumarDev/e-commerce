import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
    isLoading: false,
    addressList: [],
}

export const addAddress = createAsyncThunk("address/add", async (address, { rejectWithValue }) => {
    try {
        const result = await axios.post("http://localhost:5000/api/shopping/address/add", address);
        return result?.data;
    } catch (error) {
        rejectWithValue(error.response);
    }
});

export const fetchAllAddressess = createAsyncThunk("address/fetchAllAddressess", async (userId, { rejectWithValue }) => {
    try {
        const result = await axios.get(`http://localhost:5000/api/shopping/address/get/${userId}`);
        return result?.data;
    } catch (error) {
        rejectWithValue(error.response);
    }
})

export const updateAddress = createAsyncThunk("address/update", async ({ userId, addressId, formData }, { rejectWithValue }) => {
    try {
        const result = await axios.put(`http://localhost:5000/api/shopping/address/update/${userId}/${addressId}`, formData);
        return result?.data;
    } catch (error) {
        rejectWithValue(error.response);
    }
})

export const deleteAddress = createAsyncThunk("address/delete", async ({ userId, addressId }, { rejectWithValue }) => {
    try {
        const result = await axios.delete(`http://localhost:5000/api/shopping/address/delete/${userId}/${addressId}`);
        return result?.data;
    } catch (error) {
        rejectWithValue(error.response);
    }
})


const addressSlice = createSlice({
    name: "address",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addAddress.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(addAddress.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(addAddress.rejected, (state, action) => {
                state.isLoading = false;
            })
            .addCase(fetchAllAddressess.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchAllAddressess.fulfilled, (state, action) => {
                state.isLoading = false;
                state.addressList = action.payload?.data;
            })
            .addCase(fetchAllAddressess.rejected, (state, action) => {
                state.isLoading = false,
                    state.addressList = [];
            })
    }
});


export default addressSlice.reducer;