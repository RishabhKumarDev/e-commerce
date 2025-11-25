import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';


const initialState = {
    products: [],
    isLoading: false,
    error: null,
}

// Async Thunks...
// Add Product...
export const addNewProduct = createAsyncThunk("adminProducts/addNewProduct", async (formData, { rejectWithValue }) => {
    try {
        const result = await axios.post("http://localhost:5000/api/admin/products/add", formData, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return result?.data
    } catch (error) {
        return rejectWithValue(error.response);
    }
});

// Fetch Products...
export const fetchAllProducts = createAsyncThunk("adminProducts/fetchAllProducts", async (_, { rejectWithValue }) => {
    try {
        const result = await axios.get("http://localhost:5000/api/admin/products/get");
        return result?.data
    } catch (error) {
        return rejectWithValue(error.response);
    }
});

// Edit Product...
export const editProduct = createAsyncThunk("adminProducts/editProduct", async ({ id, formData }, { rejectWithValue }) => {
    try {
        const result = await axios.patch(`http://localhost:5000/api/admin/products/edit/${id}`, formData, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        console.log(result);
        return result?.data
    } catch (error) {
        return rejectWithValue(error.response);
    }
});


// Delete Product...
export const deleteProduct = createAsyncThunk("adminProducts/deleteProduct", async (id, { rejectWithValue }) => {
    try {
        const result = await axios.delete(`http://localhost:5000/api/admin/products/delete/${id}`);
        console.log(result);
        return result?.data
    } catch (error) {
        return rejectWithValue(error.response);
    }
});


const adminSlice = createSlice({
    name: "adminProducts",
    initialState,
    reducers: () => { },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload.data;
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.products = [];
            })
    }
});

export default adminSlice.reducer;