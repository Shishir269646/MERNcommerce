import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api';




// Async thunks
export const fetchCategories = createAsyncThunk('category/fetch', async (_, thunkAPI) => {
  try {
    const response = await api.get('/categories');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});


export const createCategory = createAsyncThunk('category/create', async (data, thunkAPI) => {
  try {
    const response = await api.post('/categories', data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});


export const updateCategory = createAsyncThunk('category/update', async ({ id, name }, thunkAPI) => {
  try {
    const response = await api.put(`/categories/${id}`, { name });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});
export const deleteCategory = createAsyncThunk('category/delete', async (id, thunkAPI) => {
  try {
    await api.delete(`/categories/${id}`);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

// Slice
export const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Update
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex(cat => cat._id === action.payload._id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(cat => cat._id !== action.payload);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});




/* 
GET     /api/categories         --> fetchCategories
POST    /api/categories         --> createCategory
PUT     /api/categories/:id     --> updateCategory
DELETE  /api/categories/:id     --> deleteCategory 

*/
