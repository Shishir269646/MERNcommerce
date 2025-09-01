// redux/orderSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/utils/api"; // axios instance with interceptor

// --------------------
// Thunks
// --------------------

// Place new order (supports COD & online methods)
export const placeOrderThunk = createAsyncThunk(
  "order/placeOrder",
  async (orderData, thunkAPI) => {
    try {
      const { data } = await api.post("/order", orderData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Get logged-in user's orders
export const getMyOrdersThunk = createAsyncThunk(
  "order/getMyOrders",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/order/my-orders");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Get order by ID
export const getOrderByIdThunk = createAsyncThunk(
  "order/getOrderById",
  async (orderId, thunkAPI) => {
    try {
      const { data } = await api.get(`/order/${orderId}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Admin: Get all orders
export const getAllOrdersThunk = createAsyncThunk(
  "order/getAllOrders",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/order");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Update order to paid (for card/PayPal, not COD)
export const updateOrderToPaidThunk = createAsyncThunk(
  "order/updateOrderToPaid",
  async ({ orderId, paymentResult }, thunkAPI) => {
    try {
      const { data } = await api.put(`/order/${orderId}/pay`, paymentResult);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Admin: Update order to delivered
export const updateOrderToDeliveredThunk = createAsyncThunk(
  "order/updateOrderToDelivered",
  async (orderId, thunkAPI) => {
    try {
      const { data } = await api.put(`/order/${orderId}/deliver`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// --------------------
// Slice
// --------------------
export const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    order: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearOrderError: (state) => {
      state.error = null;
    },
    resetOrderSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Place Order
      .addCase(placeOrderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(placeOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
        state.success = true;
      })
      .addCase(placeOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get My Orders
      .addCase(getMyOrdersThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyOrdersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getMyOrdersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Order by ID
      .addCase(getOrderByIdThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(getOrderByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All Orders
      .addCase(getAllOrdersThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllOrdersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getAllOrdersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Order to Paid
      .addCase(updateOrderToPaidThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrderToPaidThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(updateOrderToPaidThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Order to Delivered
      .addCase(updateOrderToDeliveredThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrderToDeliveredThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(updateOrderToDeliveredThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export const { clearOrderError, resetOrderSuccess } = orderSlice.actions;

