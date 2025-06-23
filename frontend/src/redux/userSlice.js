import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api';



// Fetch all users
export const fetchUsers = createAsyncThunk('user/fetchUsers', async (_, thunkAPI) => {
  try {
    const { data } = await api.get('/auth/profile');
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

// Delete user
export const deleteUser = createAsyncThunk('user/deleteUser', async (id, thunkAPI) => {
  try {
    await api.delete(`/auth/profile/${id}`);
    return { _id: id };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

// Register user
export const registerUser = createAsyncThunk('user/register', async (userData, thunkAPI) => {
  try {
    const { data } = await api.post('/auth/register', userData);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

// Login user
export const loginUser = createAsyncThunk('user/login', async (credentials, thunkAPI) => {
  try {
    const { data } = await api.post('/auth/login', credentials);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

// Logout user
export const logoutUser = createAsyncThunk('user/logout', async (_, thunkAPI) => {
  try {
    const { data } = await api.post('/auth/logout');
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

// --- Slice ---

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    authUser: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearUserError(state) {
      state.error = null;
    },
    resetUserState(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete user
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload._id);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Register user
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.authUser = action.payload;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login user
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.authUser = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout user
      .addCase(logoutUser.fulfilled, (state) => {
        state.authUser = null;
      });
  },
});

export const { clearUserError, resetUserState } = userSlice.actions;

