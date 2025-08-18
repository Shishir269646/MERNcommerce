import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api';

// CREATE address
export const createAddress = createAsyncThunk(
    'address/create',
    async (data, thunkAPI) => {
        try {
            const response = await api.post('/address', data);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// GET all addresses
export const fetchAddresses = createAsyncThunk(
    'address/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response = await api.get('/address');
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// GET single address
export const fetchAddressById = createAsyncThunk(
    'address/fetchById',
    async (id, thunkAPI) => {
        try {
            const response = await api.get(`/address/${id}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// UPDATE address
export const updateAddress = createAsyncThunk(
    'address/update',
    async ({ id, data }, thunkAPI) => {
        try {
            const response = await api.put(`/address/${id}`, data);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// DELETE address
export const deleteAddress = createAsyncThunk(
    'address/delete',
    async (id, thunkAPI) => {
        try {
            await api.delete(`/address/${id}`);
            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const addressSlice = createSlice({
    name: 'address',
    initialState: {
        addresses: [],
        selectedAddress: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearSelectedAddress(state) {
            state.selectedAddress = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch All
            .addCase(fetchAddresses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAddresses.fulfilled, (state, action) => {
                state.loading = false;
                state.addresses = action.payload;
            })
            .addCase(fetchAddresses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch One
            .addCase(fetchAddressById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAddressById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedAddress = action.payload;
            })
            .addCase(fetchAddressById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Create
            .addCase(createAddress.fulfilled, (state, action) => {
                state.addresses.push(action.payload);
            })
            .addCase(createAddress.rejected, (state, action) => {
                state.error = action.payload;
            })

            // Update
            .addCase(updateAddress.fulfilled, (state, action) => {
                const updated = action.payload;
                const index = state.addresses.findIndex(addr => addr._id === updated._id);
                if (index !== -1) {
                    state.addresses[index] = updated;
                }
            })
            .addCase(updateAddress.rejected, (state, action) => {
                state.error = action.payload;
            })

            // Delete
            .addCase(deleteAddress.fulfilled, (state, action) => {
                state.addresses = state.addresses.filter(addr => addr._id !== action.payload);
            })
            .addCase(deleteAddress.rejected, (state, action) => {
                state.error = action.payload;
            });
    }
});

export const { clearSelectedAddress } = addressSlice.actions;


/* GET /address

POST /address

GET /address/:id

PUT /address/:id

DELETE /address/:id */