import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';



const initialState = {
    isLoading: false,
    searchResults: [],
};

export const getSearchResult = createAsyncThunk("searchSlice/getSearchResult", async (keyword, { rejectWithValue }) => {
    try {
        const result = await axios.get(`http://localhost:5000/api/shopping/search/${keyword}`);
        return result?.data
    } catch (error) {
        return rejectWithValue(error?.response)
    }
})
const searchSlice = createSlice({
    name: "searchSlice",
    initialState,
    reducers: {},
    extraReducers: (buider) => {
        buider
            .addCase(getSearchResult.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSearchResult.fulfilled, (state, action) => {
                state.isLoading = false;
                state.searchResults = action.payload?.data;
            })
            .addCase(getSearchResult.rejected, (state, action) => {
                state.isLoading = false;
                state.searchResults = [];
            })
    }
});



export default searchSlice.reducer;