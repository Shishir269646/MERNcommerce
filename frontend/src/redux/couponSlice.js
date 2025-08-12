import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/utils/api"; // your axios instance

// CREATE coupon
export const createCoupon = createAsyncThunk(
    "coupon/create",
    async (data, thunkAPI) => {
        try {
            const res = await api.post("/coupon", data);
            return res.data;
        } catch (error) {
            const message =
                error.response?.data?.message || error.message || "Create failed";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// FETCH ALL coupons
export const fetchCoupons = createAsyncThunk(
    "coupon/fetchAll",
    async (_, thunkAPI) => {
        try {
            const res = await api.get("/coupon");
            return res.data;
        } catch (error) {
            const message =
                error.response?.data?.message || error.message || "Fetch failed";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// FETCH ONE coupon by id
export const fetchCouponById = createAsyncThunk(
    "coupon/fetchById",
    async (id, thunkAPI) => {
        try {
            const res = await api.get(`/coupon/${id}`);
            return res.data;
        } catch (error) {
            const message =
                error.response?.data?.message || error.message || "Fetch coupon failed";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// VALIDATE coupon by code
export const validateCoupon = createAsyncThunk(
    "coupon/validate",
    async (code, thunkAPI) => {
        try {
            const res = await api.post("/coupon/validate", { code });
            return res.data;
        } catch (error) {
            const message =
                error.response?.data?.message || error.message || "Validation failed";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// UPDATE coupon
export const updateCoupon = createAsyncThunk(
    "coupon/update",
    async ({ id, data }, thunkAPI) => {
        try {
            const res = await api.put(`/coupon/${id}`, data);
            return res.data;
        } catch (error) {
            const message =
                error.response?.data?.message || error.message || "Update failed";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// DELETE coupon
export const deleteCoupon = createAsyncThunk(
    "coupon/delete",
    async (id, thunkAPI) => {
        try {
            await api.delete(`/coupon/${id}`);
            return id;
        } catch (error) {
            const message =
                error.response?.data?.message || error.message || "Delete failed";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const couponSlice = createSlice({
    name: "coupon",
    initialState: {
        coupons: [],
        selectedCoupon: null,
        validatedCoupon: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearSelectedCoupon(state) {
            state.selectedCoupon = null;
            state.error = null;
        },
        clearValidatedCoupon(state) {
            state.validatedCoupon = null;
            state.error = null;
        },
        clearError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // CREATE
            .addCase(createCoupon.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCoupon.fulfilled, (state, action) => {
                state.loading = false;
                state.coupons.unshift(action.payload);
            })
            .addCase(createCoupon.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // FETCH ALL
            .addCase(fetchCoupons.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCoupons.fulfilled, (state, action) => {
                state.loading = false;
                state.coupons = action.payload;
            })
            .addCase(fetchCoupons.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // FETCH ONE
            .addCase(fetchCouponById.pending, (state) => {
                state.error = null;
            })
            .addCase(fetchCouponById.fulfilled, (state, action) => {
                state.selectedCoupon = action.payload;
            })
            .addCase(fetchCouponById.rejected, (state, action) => {
                state.error = action.payload;
            })

            // VALIDATE coupon
            .addCase(validateCoupon.pending, (state) => {
                state.error = null;
                state.validatedCoupon = null;
            })
            .addCase(validateCoupon.fulfilled, (state, action) => {
                state.validatedCoupon = action.payload;
            })
            .addCase(validateCoupon.rejected, (state, action) => {
                state.error = action.payload;
                state.validatedCoupon = null;
            })

            // UPDATE
            .addCase(updateCoupon.pending, (state) => {
                state.error = null;
            })
            .addCase(updateCoupon.fulfilled, (state, action) => {
                const idx = state.coupons.findIndex((c) => c._id === action.payload._id);
                if (idx !== -1) state.coupons[idx] = action.payload;
                state.selectedCoupon = null;
            })
            .addCase(updateCoupon.rejected, (state, action) => {
                state.error = action.payload;
            })

            // DELETE
            .addCase(deleteCoupon.pending, (state) => {
                state.error = null;
            })
            .addCase(deleteCoupon.fulfilled, (state, action) => {
                state.coupons = state.coupons.filter((c) => c._id !== action.payload);
            })
            .addCase(deleteCoupon.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { clearSelectedCoupon, clearValidatedCoupon, clearError } = couponSlice.actions;


