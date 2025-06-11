import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000/api',
});



// Thunks
// Fetch all users (admin use)
export const fetchUsersAsync = createAsyncThunk(
  'user/fetchUsers',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get('/auth/profile');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


// Delete user
export const deleteUserAsync = createAsyncThunk(
  'user/deleteUser',
  async (id, thunkAPI) => {
    try {
      const { data } = await api.delete(`/auth/profile/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


// Register user
export const registerUserAsync = createAsyncThunk(
  'user/register',
  async (userData, thunkAPI) => {
    try {
      const { data } = await api.post('/auth/register', userData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


// Login user
export const loginUserAsync = createAsyncThunk(
  'user/login',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.post('/auth/login', credentials);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


// Logout user
export const logoutUserAsync = createAsyncThunk(
  'user/logout',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.post('/auth/logout');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


// Slice
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    authUser: null, // Logged-in user info
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
      .addCase(fetchUsersAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete user
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      })

      // Register
      .addCase(registerUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.authUser = action.payload;
        state.success = true;
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(loginUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.authUser = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(logoutUserAsync.fulfilled, (state) => {
        state.authUser = null;
      });
  },
});

export const { clearUserError, resetUserState } = userSlice.actions;




/* 
POST /auth/register

POST /auth/login

POST /auth/logout

GET /auth/profile (for fetching all users)

DELETE /auth/profile/:id 

*/