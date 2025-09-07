import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api';



// Get all settings
export const fetchSettings = createAsyncThunk(
    'settings/fetchAll',
    async (_, thunkAPI) => {
        try {
            const { data } = await api.get('/settings');
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);

// Get setting by ID
export const fetchSettingById = createAsyncThunk(
    'settings/fetchById',
    async (id, thunkAPI) => {
        try {
            const { data } = await api.get(`/settings/${id}`);
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);

// Create a setting
export const createSetting = createAsyncThunk(
    'settings/create',
    async (formData, thunkAPI) => {
        try {
            const { data } = await api.post('/settings', formData);
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);

// Update a setting
export const updateSetting = createAsyncThunk(
    'settings/update',
    async ({ id, formData }, thunkAPI) => {
        try {
            const { data } = await api.put(`/settings/${id}`, formData);
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);

// Delete a setting
export const deleteSetting = createAsyncThunk(
    'settings/delete',
    async (id, thunkAPI) => {
        try {
            await api.delete(`/settings/${id}`);
            return id;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);

// -------------------- Slice -------------------- //

export const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        settings: [],
        currentSetting: null,
        loadingSetting: false,
        errorSetting: null,
        success: null,
    },
    reducers: {
        clearSettingState: (state) => {
            state.currentSetting = null;
            state.error = null;
            state.success = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder

            // Fetch all
            .addCase(fetchSettings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSettings.fulfilled, (state, action) => {
                state.loading = false;
                state.settings = action.payload;
            })
            .addCase(fetchSettings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch one
            .addCase(fetchSettingById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSettingById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentSetting = action.payload;
            })
            .addCase(fetchSettingById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Create
            .addCase(createSetting.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = null;
            })
            .addCase(createSetting.fulfilled, (state, action) => {
                state.loading = false;
                state.settings.push(action.payload);
                state.success = 'Setting created successfully';
            })
            .addCase(createSetting.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update
            .addCase(updateSetting.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = null;
            })
            .addCase(updateSetting.fulfilled, (state, action) => {
                state.loading = false;
                const idx = state.settings.findIndex(s => s._id === action.payload._id);
                if (idx !== -1) state.settings[idx] = action.payload;
                if (state.currentSetting?._id === action.payload._id) {
                    state.currentSetting = action.payload;
                }
                state.success = 'Setting updated successfully';
            })
            .addCase(updateSetting.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Delete
            .addCase(deleteSetting.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = null;
            })
            .addCase(deleteSetting.fulfilled, (state, action) => {
                state.loading = false;
                state.settings = state.settings.filter(s => s._id !== action.payload);
                state.success = 'Setting deleted successfully';
            })
            .addCase(deleteSetting.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearSettingState } = settingsSlice.actions;

