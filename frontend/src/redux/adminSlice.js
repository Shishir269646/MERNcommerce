import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api';

export const fetchAdminMetrics = createAsyncThunk(
    'admin/fetchMetrics',
    async (_, thunkAPI) => {
        try {
            const [users, products, orders, coupons] = await Promise.all([
                api.get('/admin/users/count'),
                api.get('/admin/products/count'),
                api.get('/admin/orders/count'),
                api.get('/admin/coupon/count'),
            ]);

            return {
                users: users.data.count,
                products: products.data.count,
                orders: orders.data.count,
                coupons: coupons.data.count,
            };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch metrics');
        }
    }
);

export const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        metrics: { users: 0, products: 0, orders: 0, coupons: 0 },
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminMetrics.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdminMetrics.fulfilled, (state, action) => {
                state.loading = false;
                state.metrics = action.payload;
            })
            .addCase(fetchAdminMetrics.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});


