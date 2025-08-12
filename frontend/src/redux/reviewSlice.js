import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api';

// CREATE or UPDATE Review
export const createOrUpdateReview = createAsyncThunk(
    'reviews/createOrUpdate',
    async ({ productId, rating, comment }, thunkAPI) => {
        try {
            const res = await api.post('/reviews', { productId, rating, comment });
            return res.data.review;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// GET all reviews by product
export const fetchReviewsByProduct = createAsyncThunk(
    'reviews/fetchByProduct',
    async (productId, thunkAPI) => {
        try {
            const res = await api.get(`/reviews/${productId}`);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// DELETE Review
export const deleteReview = createAsyncThunk(
    'reviews/delete',
    async (reviewId, thunkAPI) => {
        try {
            await api.delete(`/reviews/${reviewId}`);
            return reviewId;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const reviewSlice = createSlice({
    name: 'reviews',
    initialState: {
        reviews: [],
        loading: false,
        error: null,
        successMessage: null,
    },
    reducers: {
        clearReviewState(state) {
            state.error = null;
            state.successMessage = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Reviews
            .addCase(fetchReviewsByProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReviewsByProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = action.payload;
            })
            .addCase(fetchReviewsByProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Create/Update Review
            .addCase(createOrUpdateReview.pending, (state) => {
                state.loading = true;
            })
            .addCase(createOrUpdateReview.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.reviews.findIndex(
                    (r) => r.user === action.payload.user && r.product === action.payload.product
                );
                if (index !== -1) {
                    state.reviews[index] = action.payload;
                    state.successMessage = 'Review updated';
                } else {
                    state.reviews.push(action.payload);
                    state.successMessage = 'Review added';
                }
            })
            .addCase(createOrUpdateReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Delete Review
            .addCase(deleteReview.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteReview.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = state.reviews.filter((r) => r._id !== action.payload);
                state.successMessage = 'Review deleted';
            })
            .addCase(deleteReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearReviewState } = reviewSlice.actions;

