import { createSlice } from '@reduxjs/toolkit';

// This slice is now for placeholder purposes and can be extended later if needed.
// The dashboard component will derive its metrics directly from other slices.

export const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        // Metrics are now calculated in the component that needs them.
        // This state can be used for other admin-wide UI states.
        loading: false,
        error: null,
    },
    reducers: {
        // Reducers can be added here for other admin functionalities.
    },
});

// To be added to the store
export default adminSlice.reducer;
