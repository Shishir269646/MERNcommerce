import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api'; // Axios instance with baseURL and headers

// ------------------ ASYNC THUNKS ------------------ //

// Register new user
export const registerUser = createAsyncThunk(
  '/auth/register',
  async (userData, thunkAPI) => {
    try {
      const res = await api.post('/auth/register', userData);
      return res.data; // contains { user, token }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Registration failed');
    }
  }
);

// Login user
export const loginUser = createAsyncThunk(
  '/auth/login',
  async (credentials, thunkAPI) => {
    try {
      const res = await api.post('/auth/login', credentials);
      return res.data; // contains { user, token }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);

// Get all users (Admin only)
export const getAllUsers = createAsyncThunk(
  'user/getAllUsers',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('/auth/users');
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch users');
    }
  }
);

// Delete user by ID (Admin only)
export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (userId, thunkAPI) => {
    try {
      await api.delete(`/auth/user/${userId}`);
      return userId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to delete user');
    }
  }
);

// Update user address
export const updateUserAddress = createAsyncThunk(
  'user/updateAddress',
  async ({ userId, addressData }, thunkAPI) => {
    try {
      const res = await api.put(`/auth/user/${userId}/address`, addressData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to update address');
    }
  }
);

// ------------------ INITIAL STATE ------------------ //

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  addressError: null,

  // Admin-related state
  users: [],
  adminLoading: false,
  adminError: null,
};

// ------------------ SLICE ------------------ //

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('userInfo');
      localStorage.removeItem('token');
    },
    loadUserFromStorage: (state) => {
      const storedUser = localStorage.getItem('userInfo');
      const storedToken = localStorage.getItem('token');

      if (storedUser && storedToken) {
        const user = JSON.parse(storedUser);
        state.user = user;
        state.token = storedToken;
        state.isAuthenticated = true;
      } else {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      }
    }
    ,
    clearUserError: (state) => {
      state.error = null;
    },
    clearAddressError: (state) => {
      state.addressError = null;
    },
  },
  extraReducers: (builder) => {
    // ----- Register -----
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem('userInfo', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ----- Login -----
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem('userInfo', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ----- Get All Users -----
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.adminLoading = true;
        state.adminError = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.adminLoading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.adminLoading = false;
        state.adminError = action.payload;
      });

    // ----- Delete User -----
    builder
      .addCase(deleteUser.pending, (state) => {
        state.adminLoading = true;
        state.adminError = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.adminLoading = false;
        state.users = state.users.filter((user) => user._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.adminLoading = false;
        state.adminError = action.payload;
      });

    // ----- Update User Address -----
    builder
      .addCase(updateUserAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        localStorage.setItem('userInfo', JSON.stringify(action.payload.user));
      })
      .addCase(updateUserAddress.rejected, (state, action) => {
        state.loading = false;
        state.addressError = action.payload;
      });
  },
});

// ------------------ EXPORTS ------------------ //

export const {
  logoutUser,
  loadUserFromStorage,
  clearUserError,
  clearAddressError,
} = userSlice.actions;
