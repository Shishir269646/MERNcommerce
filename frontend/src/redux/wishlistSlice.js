import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api'; // Axios instance with auth token

// GET Wishlist
export const fetchWishlist = createAsyncThunk(
    'wishlist/fetch',
    async (_, thunkAPI) => {
        try {
            const res = await api.get('/wishlist');
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);


// ADD to Wishlist
export const addToWishlist = createAsyncThunk(
    'wishlist/add',
    async (productId, thunkAPI) => {
        try {
            const res = await api.post('/wishlist', { productId });
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// REMOVE from Wishlist
export const removeFromWishlist = createAsyncThunk(
    'wishlist/remove',
    async (productId, thunkAPI) => {
        try {
            const res = await api.delete(`/wishlist/${productId}`);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// CLEAR Wishlist
export const clearWishlist = createAsyncThunk(
    'wishlist/clear',
    async (_, thunkAPI) => {
        try {
            const res = await api.delete('/wishlist');
            return res.data.wishlist;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        wishlist: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearWishlistError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchWishlist.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.wishlist = action.payload;
            })
            .addCase(fetchWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Add
            .addCase(addToWishlist.pending, (state) => {
                state.loading = true;
            })
            .addCase(addToWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.wishlist = action.payload;
            })
            .addCase(addToWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Remove
            .addCase(removeFromWishlist.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeFromWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.wishlist = action.payload;
            })
            .addCase(removeFromWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Clear
            .addCase(clearWishlist.pending, (state) => {
                state.loading = true;
            })
            .addCase(clearWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.wishlist = action.payload;
            })
            .addCase(clearWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearWishlistError } = wishlistSlice.actions;

