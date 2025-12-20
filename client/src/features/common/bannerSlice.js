import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';



const initialState = {
    isLoading: false,
    bannerImages: [],
};

export const getBannerImages = createAsyncThunk("bannerSlice/getBannerImages", async (_, { rejectWithValue }) => {
    try {
        const result = await axios.get(`http://localhost:5000/api/common/banner/get`);
        return result?.data
    } catch (error) {
        return rejectWithValue(error?.response)
    }
});

export const addBannerImage = createAsyncThunk("bannerSlice/addBannerImage", async (image, { rejectWithValue }) => {
    try {
        const result = await axios.post(`http://localhost:5000/api/common/banner/upload`, { image });
        return result?.data
    } catch (error) {
        return rejectWithValue(error?.response)
    }
});


const bannerSlice = createSlice({
    name: "searchSlice",
    initialState,
    reducers: {},
    extraReducers: (buider) => {
        buider
            .addCase(getBannerImages.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBannerImages.fulfilled, (state, action) => {
                state.isLoading = false;
                state.bannerImages = action.payload?.data?.images;
            })
            .addCase(getBannerImages.rejected, (state, action) => {
                state.isLoading = false;
                state.bannerImages = [];
            })
    }
});



export default bannerSlice.reducer;