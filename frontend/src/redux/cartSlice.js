import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

// ----------- ASYNC THUNKS ------------

// Get all cart items for logged-in user
export const getCartItems = createAsyncThunk('cart/getCartItems', async (_, thunkAPI) => {
  try {
    const { data } = await api.get('/cart');
    return data; // Array of cart items
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch cart items');
  }
});

// Add or update an item in the cart
export const addToCart = createAsyncThunk('cart/addToCart', async (payload, thunkAPI) => {
  try {
    const { data } = await api.post('/cart/add', payload);
    return data.cartItem; // Single cart item object
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to add to cart');
  }
});

// Remove a cart item by ID
export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (cartItemId, thunkAPI) => {
  try {
    await api.delete(`/cart/${cartItemId}`);
    return cartItemId; // Return the removed cartItem's ID
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to remove from cart');
  }
});

// Clear entire cart for the user
export const clearCart = createAsyncThunk('cart/clearCart', async (_, thunkAPI) => {
  try {
    await api.delete('/cart');
    return true;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to clear cart');
  }
});

// Update quantity for a specific cart item
export const updateCartItemQuantity = createAsyncThunk(
  'cart/updateCartItemQuantity',
  async ({ cartItemId, quantity }, thunkAPI) => {
    try {
      const { data } = await api.patch(`/cart/${cartItemId}`, { quantity });
      return data.cartItem; // Updated cart item object
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to update quantity');
    }
  }
);

// ----------- INITIAL STATE ------------

const initialState = {
  cartItems: [],
  loading: false,
  error: null,
};

// ----------- SLICE ------------

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Cart Items
      .addCase(getCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        const newItem = action.payload;
        const existingIndex = state.cartItems.findIndex(item => item._id === newItem._id);
        if (existingIndex !== -1) {
          state.cartItems[existingIndex] = newItem;
        } else {
          state.cartItems.push(newItem);
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Remove from Cart
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.filter(item => item._id !== action.payload);
      })

      // Clear Cart
      .addCase(clearCart.fulfilled, (state) => {
        state.cartItems = [];
      })

      // Update Quantity - smooth update without reloading entire cart
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        const updatedItem = action.payload; // full cart item with product info
        const index = state.cartItems.findIndex(item => item._id === updatedItem._id);
        if (index !== -1) {
          state.cartItems[index] = updatedItem;
        }
      })

      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});


